import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import Form from "react-bootstrap/Form";
import Banner from '../templateParts/Banner';
import { CustomerContext } from "../../contexts/PDProvider";
import Spinners from '../templateParts/Spinners';
import RedirectionModal from "../templateParts/modals/RedirectionModal";

class FreeProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            propertyUrl: '',
            county: 'tarrant',
            state1: 'texas',
            accountNumber: '',
            propertyAbsent: false,
            alertVisible: false,
            alertVariant: 'success',
            alertDismissible: 'false',
            alertMessage: '',
            goToCheckOut: false,
            baseUrl: process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_SERVER_SANDBOX_URL : process.env.REACT_APP_SERVER_PRODUCTION_URL
        }

        this.handleFormSubmission = this.handleFormSubmission.bind(this);
    }

    componentDidMount() {
        // Check If We Have The Searched Property In Local Storage
        // If Not there show modal to search for property
        const propertyPresent = localStorage.getItem("chosenProperty");
        if (!propertyPresent) {
            this.setState({propertyAbsent: true})
        } else {
            const chosenProperty = JSON.parse(propertyPresent);
            if (chosenProperty.Account_Num && chosenProperty.Account_Num !== "") {
                const accountNumber = chosenProperty.Account_Num;

                const hostName = process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_HOSTNAME_SANDBOX_URL : process.env.REACT_APP_HOSTNAME_PRODUCTION_URL;
                
                const propertyUrl = `${hostName}/property/${accountNumber}`;
                this.setState({
                    propertyUrl,
                    accountNumber
                });
            } else {
                this.setState({propertyAbsent: true})
            }
        }

    }

    handleFormSubmission({firstName, lastName, email}, actions) {
        //add the firstname and lastname and email to the state
        let formData = {...this.state, firstName: firstName, lastName: lastName, email: email};
        //console.log(formData);
        axios({
            method: "post",
            url: `${this.state.baseUrl}/infusionsoft_novak/creategroup.php`,
            data: formData
        })
        .then(result => {
            if (result.data.sent) {
                const that = this;
                this.setState({
                    alertVariant: 'success', 
                    alertDismissible: false,
                    alertVisible: true,
                    alertMessage: 'A Confirmation Email Has Been Sent. Please Wait While We Redirect You'
                });
                setTimeout(() => that.handleRedirection(), 10000);
            } else {
                
                console.log(result.data);
                this.setState({ 
                    alertVariant: 'danger', 
                    alertDismissible: true,
                    alertVisible: true,
                    alertMessage: 'A Server Error Occured. Please Try Again Later'
                });
                
            }
            actions.setSubmitting(false);
        })
        .catch(error => console.log(error));
    }

    handleRedirection = () => {
        this.setState({ goToCheckOut: true })
    }

    toggleAlert = () => {
        this.setState({ alertVisible: false })
    }

    render() {

        const { styles } = this.context;

        const SignupSchema = Yup.object().shape({
            firstName: Yup.string()
              .required('Please Type In Your Firstname'),
            lastName: Yup.string()
              .required('Please Type In Your Lastname'),
            email: Yup.string()
              .email('Invalid Email Address')
              .required('Please Type In Your Email Address'),
          });

        return (
            <Fragment>
                {this.state.goToCheckOut && <Redirect to='/property' />}
                <Banner 
                    height="500px"
                    backgroundImage={`url(${require('../../assets/images/cover_img_1.jpg')})`}
                    title="Get Your Free Property Report"
                />
                <div className={styles.colorlibWork}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className={`${styles.workFlex} ${styles.noGutters}`}>
                                    <div className={`${styles.half} ${styles.animateBox}`}>
                                        <div className={`row ${styles.noGutters}`} style={{height: '100%'}}>
                                            <div className={`col-md-12 col-md-pull-12 ${styles.noGutters}`}>
                                                <div className={`${styles.displayT} ${styles.desc}`}>
                                                    <div className={styles.displayTc}>
                                                        <ScrollAnimation animateIn="fadeInUp">
                                                        <h2>Get Your Free Property Report </h2>
                                                        <p>Enter your name and email address below, and we will email you a link to your property report.</p>
                                                        <Formik
                                                            initialValues={{
                                                                firstName: '',
                                                                lastName: '',
                                                                email: '',
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
                                                                            <label htmlFor="firstName">Firstname</label>
                                                                            <Form.Control 
                                                                                type="text" 
                                                                                id="firstName" 
                                                                                name="firstName"
                                                                                className={`${styles.formControl}`} 
                                                                                placeholder="Enter Your Firstname" 
                                                                                value={values.firstName}
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur} 
                                                                                isInvalid={errors.firstName && touched.firstName}
                                                                            />
                                                                            <Form.Control.Feedback type="invalid">
                                                                                {errors.firstName}
                                                                            </Form.Control.Feedback>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row form-group">
                                                                        <div className="col-md-12">
                                                                            <label htmlFor="lastname">Lastname</label>
                                                                            <Form.Control 
                                                                                type="text" 
                                                                                id="lastname" 
                                                                                name="lastName"
                                                                                className={`${styles.formControl}`} 
                                                                                placeholder="Enter your Lastname" 
                                                                                value={values.lastName}
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur} 
                                                                                isInvalid={errors.lastName && touched.lastName}
                                                                            />
                                                                            <Form.Control.Feedback type="invalid">
                                                                                {errors.lastName}
                                                                            </Form.Control.Feedback>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row form-group">
                                                                        <div className="col-md-12">
                                                                            <label htmlFor="email">Email Address</label>
                                                                            <Form.Control 
                                                                                type="text" 
                                                                                id="email" 
                                                                                name="email"
                                                                                className={`${styles.formControl}`} 
                                                                                placeholder="Enter your email" 
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

                                                                    <div className="form-group">
                                                                        <button
                                                                            className={`btn btn-primary ${styles.btn} ${styles.btnPrimary}`}
                                                                            disabled={isSubmitting}
                                                                            type="submit"
                                                                        >
                                                                            {isSubmitting ? 
                                                                                (<Fragment><Spinners /> <span>Please Wait...</span></Fragment>) 
                                                                                : `Submit Your Details`
                                                                            }
                                                                        </button>
                                                                    </div>
                                                                    <Alert 
                                                                        variant={this.state.alertVariant} 
                                                                        onClose={() => this.toggleAlert()} 
                                                                        dismissible={this.state.alertDismissible}
                                                                        show={this.state.alertVisible}
                                                                    >
                                                                        {this.state.alertMessage} {this.state.alertVariant === 'success' ? <Spinners /> : ''}
                                                                    </Alert>
                                                                </Form>	
                                                            )}
                                                        </Formik>
                                                        </ScrollAnimation>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.half} ${styles.animateBox}`}>
                                        <div className={`row ${styles.noGutters}`}>
                                            <div className={`col-md-12 col-md-push-12 ${styles.noGutters}`}>
                                                <div 
                                                    className={styles.workImg} 
                                                    style={{backgroundImage: `url(${require('../../assets/images/happy-couple-and-dream-home_ed.jpg')})`}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.propertyAbsent && 
                    <RedirectionModal 
                        showModal={this.state.propertyAbsent} 
                        modalTitle={'No Property Selected'}
                        modalBody={'You Have Not Yet Searched For Your Property'}
                        modalDestination="/"
                        modalActionText={'Go Back To Homepage'}
                    />
                }
            </Fragment>
        );
    }
}


FreeProperty.contextType = CustomerContext;

export default FreeProperty;