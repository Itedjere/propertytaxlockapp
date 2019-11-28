import React, { Component, Fragment } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { Formik } from 'formik';
import Form from "react-bootstrap/Form";
import * as Yup from 'yup';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Banner from '../templateParts/Banner';
import isAuthenticated from "../templateParts/Authentication/IsAuthenticated";
import { CustomerContext } from "../../contexts/PDProvider";

class Login extends Component {
    static contextType = CustomerContext;

    constructor(props) {
        super(props);
        this.state = {
            baseUrl: process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_SERVER_SANDBOX_URL : process.env.REACT_APP_SERVER_PRODUCTION_URL,
            email: "",
            password: "",
            alertMessage: "",
            alertVisible: false,
            signNowAlertVisible: false,
            signNowAlertMessage: "",
        }

        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
    }

    componentDidMount() {
        // First Check If The Account Number is in the address
        let parsedQuerySting = queryString.parse(this.props.location.search);
        let accountNumber = parsedQuerySting.accountNum;
        // If there, pull the records from database
        if (accountNumber && accountNumber !== "") {
            // Make An API call to the server
            axios.post(`${this.state.baseUrl}/infusionsoft_novak/UpdatePaidContact.php`, {
                accountNumber
            })
            .then(response => {
                if (response.data.code === "update_success") {
                    this.setState({
                        signNowAlertVisible: true,
                        signNowAlertMessage: response.data.message,
                    });
                    // Clear LocalStorage
                    if (localStorage.getItem("chosenProperty")) {
                        localStorage.removeItem("chosenProperty");
                    }
                }
            })
        }
    }

    async handleFormSubmission(values, actions) {
        //add the password and email to the state
        let formData = {email: values.email, password: values.password};
        
        let response = await axios.post(`${this.state.baseUrl}/authentication/Login.php`, formData);
        // console.log(response.data.acc[0]);
        if (response.data.isLogged) {
            // console.log(response.data.notifications);
            // Store Information In Local Storage
            const appState = {
                jwt: response.data.jwt,
                properties: response.data.properties,
                customerId: response.data.customerId,
                notifications: response.data.notifications,
            }

            localStorage.setItem("appState", JSON.stringify(appState));
            // Store Account Numbers In Context
            this.context.setProperties(response.data.properties);
            // Store Notifications In Context
            this.context.setNotifications(response.data.notifications);

            // You can set State so as to redirect to dashboard
            this.setState({
                alertMessage: '',
                alertVisible: false
            })
        } else {
            actions.setSubmitting(false);
            this.setState({
                alertMessage: response.data.message,
                alertVisible: true
            });
        }
    }

    closeAlert() {
        this.setState({
            alertVisible: false
        })
    }

    closeSignNowAlert() {
        this.setState({
            signNowAlertVisible: false
        })
    }

    render() {
        const SignupSchema = Yup.object().shape({
            password: Yup.string()
              .required('Password Is Required'),
            email: Yup.string()
              .email('Invalid Email Address')
              .required('Email Address Is Required')
        });
        const { styles } = this.context;
        return (
            <Fragment>
                {isAuthenticated() ? <Redirect to="/user-profile-lite" /> : (
                    <Fragment>
                        <Banner 
                            title="Login"
                            height="500px"
                            backgroundImage={`url(${require('../../assets/images/cover_img_1.jpg')})`}
                        />
                        <div id={styles.colorlibContact}>
                            <div className="container">
                                <Alert 
                                    variant="success" 
                                    onClose={() => this.closeSignNowAlert()} 
                                    dismissible
                                    show={this.state.signNowAlertVisible}
                                    className="mb-5"
                                >
                                    {this.state.signNowAlertMessage}
                                </Alert>
                                <div className="row">
                                    <div className={`col-md-6 ${styles.animateBox}`}>
                                        <ScrollAnimation animateIn="fadeInUp">
                                        <h2>Login</h2>
                                        <Formik
                                            initialValues={{
                                                email: '',
                                                password: '',
                                            }}
                                            validationSchema={SignupSchema}
                                            onSubmit={(values, actions) => {
                                                // same shape as initial values
                                                this.handleFormSubmission(values, actions);
                                            }}
                                        >
                                            {({ 
                                                isSubmitting,
                                                handleSubmit,
                                                handleChange,
                                                handleBlur,
                                                values,
                                                touched,
                                                errors,
                                            }) => (
                                                <Form noValidate onSubmit={handleSubmit}>
                                                    <div className="row form-group">
                                                        <div className="col-md-12">
                                                            <label htmlFor="email">Email</label>
                                                            <Form.Control 
                                                                type="text" 
                                                                id="email" 
                                                                name="email"
                                                                className={`${styles.formControl}`} 
                                                                placeholder="Your email address" 
                                                                value={values.email}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur} 
                                                                isInvalid={errors.email && touched.email}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.email}
                                                            </Form.Control.Feedback>
                                                        </div>
                                                    </div>

                                                    <div className="row form-group">
                                                        <div className="col-md-12">
                                                            <label htmlFor="subject">Password</label>
                                                            <Form.Control 
                                                                type="password" 
                                                                id="subject" 
                                                                name="password"
                                                                className={`${styles.formControl}`} 
                                                                placeholder="Enter your password" 
                                                                value={values.password}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur} 
                                                                isInvalid={errors.password && touched.password}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.password}
                                                            </Form.Control.Feedback>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <button
                                                            className={`btn btn-primary ${styles.btn} ${styles.btnPrimary}`}
                                                            disabled={isSubmitting}
                                                            type="submit"
                                                        >
                                                            {isSubmitting ? 
                                                                (<Fragment><img src={require('../../assets/images/ajax-loader.gif')} width="16" height="16" alt="Loading" /> <span>Please Wait...</span></Fragment>) 
                                                                : `Click Here To Login`
                                                            }
                                                        </button>
                                                    </div>
                                                </Form>		
                                            )}
                                        </Formik>
                                        <Alert 
                                            variant="danger" 
                                            onClose={() => this.closeAlert()} 
                                            dismissible
                                            show={this.state.alertVisible}
                                        >
                                            {this.state.alertMessage}
                                        </Alert>
                                        </ScrollAnimation>
                                    </div>
                                    <div className={`col-md-6 ${styles.animateBox}`}>
                                        <ScrollAnimation animateIn="fadeInUp">
                                        <h2>Register</h2>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label>How To Register</label>
                                                <div className={styles.contactInfoWrapFlex}>
                                                    <div className={styles.conInfo}>
                                                        <p>
                                                            <span>
                                                                <i className="icon-location-2"></i> 
                                                            </span> 
                                                            To Register, You Need To First Search For Your Property. Click 
                                                            the Button Below To Search For Your Property.
                                                        </p>
                                                        <p>
                                                            <Link to="/" className={`btn btn-primary ${styles.btn} ${styles.btnPrimary}`}>Search For Your Property</Link>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </ScrollAnimation>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )}

            </Fragment>
        );
    }
}

export default Login;