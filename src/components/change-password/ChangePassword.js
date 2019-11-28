import React, { Component, Fragment } from 'react';
import axios from "axios";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import Spinners from '../templateParts/Spinners';
import {
    Alert,
    Card,
    CardHeader,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    FormGroup,
    FormFeedback,
    FormInput,
    Button
} from "shards-react";

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseUrl: process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_SERVER_SANDBOX_URL : process.env.REACT_APP_SERVER_PRODUCTION_URL,
            jwt: '',
            updateType: 'changepassword',
            userId: null,
            alertVisible: false,
            alertMessage: '',
            alertType: 'success',
        };
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);
    }

    componentDidMount() {
        const appCredentials = JSON.parse(localStorage.getItem("appState"));
        if (appCredentials) {
            const customerId = appCredentials.customerId;
            const jwt = appCredentials.jwt;
            this.setState({
                userId: customerId,
                jwt,
            })
        }
    }

    handleFormSubmission(values, actions) {
        // Make A Post Request
        axios.post(`${this.state.baseUrl}/woocommerce/UpdateCustomer.php`, {
            oldpassword: values.oldpassword,
            newpassword: values.newpassword,
            userId: this.state.userId,
            jwt: this.state.jwt,
            updateType: this.state.updateType,
        })
        .then(response => {
            console.log(response.data);
            if (response.data.code === undefined) {
                // No Error
                this.setState({
                    alertVisible: true,
                    alertMessage: 'You Now Have A New Password',
                    alertType: 'success',
                    oldpassword: '',
                    newpassword: '',
                    confpassword: '',
                });
                actions.setSubmitting(false);
            } else {
                // Error Present
                this.setState({
                    alertVisible: true,
                    alertMessage: response.data.message,
                    alertType: 'danger',
                });
                actions.setSubmitting(false);
            }
        })
        .catch(error => {
          // Error Present
          this.setState({
            alertVisible: true,
            alertMessage: 'An Error Was Encountered. Please Try Again Later',
            alertType: 'danger',
          });
          actions.setSubmitting(false);
        });
    }
    
    dismissAlert() {
        this.setState({ alertVisible: false })
    }

    render() {
        function equalTo(ref, msg) {

            return Yup.mixed().test({
                name: 'equalTo',
                exclusive: false,
                message: msg,
                params: {
                  reference: ref.path,
                },
                test: function(value) {
                  return value === this.resolve(ref);
                },
            });
        };

        Yup.addMethod(Yup.string, 'equalTo', equalTo);

        const SignupSchema = Yup.object().shape({
            oldpassword: Yup.string()
              .required('Enter Your Password'),
            newpassword: Yup.string()
                .min(5, `Must Be 5 Characters Or More`)
                .required('Enter A New Password'),
            confpassword: Yup.string()
                .equalTo(Yup.ref('newpassword'), 'Passwords must match')
                .required('Confirm Your New Password'),
        });
        const { title } = this.props;
        return (
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                    <h6 className="m-0">{title}</h6>
                </CardHeader>
                <ListGroup flush>
                    <ListGroupItem className="p-3">
                        <Row>
                            <Col>
                                <Formik
                                    initialValues={{
                                        oldpassword: '',
                                        newpassword: '',
                                        confpassword: ''
                                    }}
                                    validationSchema={SignupSchema}
                                    onSubmit={(values, actions) => {
                                        // same shape as initial values
                                        this.handleFormSubmission(values, actions);
                                    }}
                                >
                                    {
                                        ({
                                            values,
                                            errors,
                                            touched,
                                            handleBlur,
                                            handleChange,
                                            isSubmitting,
                                        }) => (
                                            <Form>
                                                <FormGroup>
                                                    <label htmlFor="cpassword">Current Password</label>
                                                    <FormInput
                                                        id="cpassword"
                                                        type="password"
                                                        name="oldpassword"
                                                        placeholder="Current Password"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.oldpassword}
                                                        invalid={errors.oldpassword && touched.oldpassword}
                                                    />
                                                    {errors.oldpassword && touched.oldpassword ? (
                                                        <FormFeedback>{errors.oldpassword}</FormFeedback>
                                                    ) : null}
                                                </FormGroup>
                                                <FormGroup>
                                                    <label htmlFor="newpassword">New Password</label>
                                                    <FormInput
                                                        id="newpassword"
                                                        type="password"
                                                        name="newpassword"
                                                        placeholder="New Password"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.newpassword}
                                                        invalid={errors.newpassword && touched.newpassword}
                                                    />
                                                    {errors.newpassword && touched.newpassword ? (
                                                        <FormFeedback>{errors.newpassword}</FormFeedback>
                                                    ) : null}
                                                </FormGroup>
                                                <FormGroup>
                                                    <label htmlFor="confpassword">Confirm Password</label>
                                                    <FormInput
                                                        id="confpassword"
                                                        type="password"
                                                        name="confpassword"
                                                        placeholder="Confirm Password"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.confpassword}
                                                        invalid={errors.confpassword && touched.confpassword}
                                                    />
                                                    {errors.confpassword && touched.confpassword ? (
                                                        <FormFeedback>{errors.confpassword}</FormFeedback>
                                                    ) : null}
                                                </FormGroup>
                                                <Button 
                                                    theme="primary" 
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? (<Fragment><Spinners /> Please Wait...</Fragment>) : 'Change Password'}
                                                </Button>
                                            </Form>
                                        )
                                    }
                                </Formik>
                                <Alert 
                                    dismissible={this.dismissAlert} 
                                    open={this.state.alertVisible} 
                                    theme={this.state.alertType}
                                    className="mt-3"
                                >
                                    { this.state.alertMessage }
                                </Alert>
                            </Col>
                        </Row>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        );
    }
}

ChangePassword.propTypes = {
    /**
     * The component's title.
     */
    title: PropTypes.string
};

ChangePassword.defaultProps = {
    title: "Change Password"
};

export default ChangePassword;