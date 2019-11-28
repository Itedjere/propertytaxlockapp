import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import ScrollAnimation from 'react-animate-on-scroll';
import * as Yup from 'yup';
import Banner from '../templateParts/Banner';
// import StepsToReduction from '../templateParts/StepsToReduction';
import BillingDetails from '../templateParts/PageSections/Checkout/BillingDetails';
import OrderPayment from '../templateParts/PageSections/Checkout/OrderPayment';
import { CustomerContext } from "../../contexts/PDProvider";
import RedirectionModal from "../templateParts/modals/RedirectionModal";
import PaymentModal from "../templateParts/modals/PaymentModal";

class CheckOut extends Component {

    constructor(props) {
        super(props);
        this.state = {
            propertyAbsent: false,
            showModal: false,
            paymentInProgress: false,
            paymentStatus: '',
            paymentResponse: {},
            couponID: '',
            isCreditCardDetailsHidden: false,
            baseUrl: process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_SERVER_SANDBOX_URL : process.env.REACT_APP_SERVER_PRODUCTION_URL,
        }
    }

    componentDidMount() {
        // check localstorage
        const propertyPresent = localStorage.getItem("chosenProperty");
    
        // If not in localStorage, show a modal for the user to go to homepage
        if (!propertyPresent) {
            // Check If We Have The Searched Property In Local Storage
            // If Not there show modal to search for property
            this.setState({propertyAbsent: true});
        } 
    }

    hideCreditCardDetails = () => this.setState(state => ({
        isCreditCardDetailsHidden: !state.isCreditCardDetailsHidden
    }));

    handleFormSubmission = (values, actions) => {
        // Call Axios Call The Backend
        const property = JSON.parse(localStorage.getItem("chosenProperty"));
        if (property) {
            const { 
                Account_Num, 
                Situs_Address, 
                Owner_Name, 
                Owner_Address, 
                Owner_CityState, 
                Owner_Zip, 
                LegalDescription, 
                productID } = property;
            
            const formData = {
                ...values,
                Account_Num,
                Situs_Address,
                Owner_Name,
                Owner_Address,
                Owner_CityState,
                Owner_Zip,
                LegalDescription,
                productID,
                couponID: this.state.couponID,
            };

            // console.log(formData);
    
            axios.post(`${this.state.baseUrl}/authorizenet/Payment.php`, formData)
            .then(response => {
                console.log(response.data);
                const paymentStatus = response.data.paymentMessage;

                if (response.data.code === "payment_success") {

                    const paymentAmount = response.data.amount;
                    const signNowLink = response.data.signNowLink;
                    const situsAddress = response.data.situsAddres;

                    this.setState({
                        paymentInProgress: false,
                        paymentStatus: paymentStatus,
                        paymentResponse: {
                            situsAddress: situsAddress,
                            signNowLink: signNowLink,
                            amount: paymentAmount,
                        }
                    });

                } else {
                    this.setState({
                        paymentStatus: paymentStatus,
                        paymentInProgress: false,
                    });
                } 
                // Change The Loading State To False
                actions.setSubmitting(false);
            })
        } else {
            // Check If We Have The Searched Property In Local Storage
            // If Not there show modal to search for property
            this.setState({propertyAbsent: true});
        }
    }

    setCouponID = (couponID) => this.setState({ couponID })

    closeModal = () => {
        this.setState({ 
            showModal: false,
            paymentInProgress: false,
            paymentStatus: '',
            paymentResponse: {},
        })
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

        const PaymentSchemaWithCreditCard = Yup.object().shape({
            firstName: Yup.string()
              .required('Enter Your Firstname'),
            lastName: Yup.string()
              .required('Enter Your Lastname'),
            email: Yup.string()
              .email('Invalid Email Address')
              .required('Enter Your Email Address'),
            address: Yup.string()
                .required('Enter Your Address'),
            city: Yup.string()
                .required('Enter City'),
            state: Yup.string()
                .required('Pick State'),
            zipcode: Yup.string()
                .matches(/[0-9]/, 'Digits Only')
                .length(5, `5 Digits Only`)
                .required('Enter Zipcode'),
            phone: Yup.string()
                .matches(/[0-9]/, 'Digits Only')
                .required('Enter Your Phone Number'),
            password: Yup.string()
                .min(5, `Must Be 5 Characters Or More`)
                .required('Password Is Required'),
            password1: Yup.string()
                .equalTo(Yup.ref('password'), 'Passwords must match')
                .required('Confirm Your Password'),
            cardnumber: Yup.string()
                .matches(/[0-9]/, 'Digits Only')
                .required('Add Your Credit Card Number'),
            expirymonth: Yup.string()
                .required('Add Expiry Month'),
            expiryyear: Yup.string()
                .matches(/[0-9]/, 'Digits Only')
                .length(4, `4 Digits Only`)
                .required('Add Expiry Year'),
            cardcode: Yup.string()
                .matches(/[0-9]/, 'Digits Only')
                .length(3, `3 Digits Only`)
                .required('Add CVC Number'),
        });
        const PaymentSchemaWithoutCreditCard = Yup.object().shape({
            firstName: Yup.string()
              .required('Enter Your Firstname'),
            lastName: Yup.string()
              .required('Enter Your Lastname'),
            email: Yup.string()
              .email('Invalid Email Address')
              .required('Enter Your Email Address'),
            address: Yup.string()
                .required('Enter Your Address'),
            city: Yup.string()
                .required('Enter City'),
            state: Yup.string()
                .required('Pick State'),
            zipcode: Yup.string()
                .matches(/[0-9]/, 'Digits Only')
                .length(5, `5 Digits Only`)
                .required('Enter Zipcode'),
            phone: Yup.string()
                .matches(/[0-9]/, 'Digits Only')
                .required('Enter Your Phone Number'),
            password: Yup.string()
                .min(5, `Must Be 5 Characters Or More`)
                .required('Password Is Required'),
            password1: Yup.string()
                .equalTo(Yup.ref('password'), 'Passwords must match')
                .required('Confirm Your Password'),
        });

        const { styles } = this.context;
        
        return (
            <Fragment>
                <Banner 
                    height="500px"
                    backgroundImage={`url(${require('../../assets/images/cover_img_1.jpg')})`} 
                    title="Checkout"
                />
                <div className={styles.colorlibAbout}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="staff-entry">
                                    <Formik
                                        initialValues={{
                                            firstName: '',
                                            lastName: '',
                                            email: '',
                                            address: '',
                                            company: '',
                                            address2: '',
                                            city: '',
                                            state: '',
                                            zipcode: '',
                                            phone: '',
                                            password: '',
                                            password1: '',
                                            cardnumber: '',
                                            expirymonth: '',
                                            expiryyear: '',
                                            cardcode: '',
                                        }} 
                                        enableReinitialize={true}
                                        validationSchema={!this.state.isCreditCardDetailsHidden ? PaymentSchemaWithCreditCard : PaymentSchemaWithoutCreditCard}
                                        onSubmit={(values, actions) => {
                                            // console.log(values)
                                            this.setState({
                                                paymentInProgress: true,
                                                showModal: true,
                                            });
                                            // actions.setSubmitting(false);
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
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-6">
                                                        <ScrollAnimation 
                                                            animateIn="fadeInUp"
                                                            style={{ minHeight: '100%', backgroundColor: '#ffffff' }}
                                                        >
                                                        <BillingDetails 
                                                            errors={errors} 
                                                            touched={touched}
                                                            handleBlur={handleBlur}
                                                            handleChange={handleChange}
                                                            values={values} 
                                                        />
                                                        </ScrollAnimation>
                                                    </div>
                                                    <div className="col-sm-12 col-md-6">
                                                        <ScrollAnimation 
                                                            animateIn="fadeInUp" 
                                                            delay={500}
                                                        >
                                                            <OrderPayment 
                                                                errors={errors} 
                                                                touched={touched}
                                                                handleBlur={handleBlur}
                                                                handleChange={handleChange}
                                                                values={values}
                                                                isSubmitting={isSubmitting}
                                                                setCouponID={this.setCouponID}
                                                                isCreditCardDetailsHidden={this.state.isCreditCardDetailsHidden}
                                                                hideCreditCardDetails={this.hideCreditCardDetails}
                                                            />
                                                        </ScrollAnimation>
                                                    </div>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <RedirectionModal 
                    showModal={this.state.propertyAbsent} 
                    modalTitle={'No Property Selected'}
                    modalBody={'You Have Not Yet Searched For Your Property'}
                    modalDestination="/"
                    modalActionText={'Go Back To Homepage'}
                />

                <PaymentModal 
                    showModal={this.state.showModal}
                    closeModal={this.closeModal}
                    paymentInProgress={this.state.paymentInProgress}
                    paymentStatus={this.state.paymentStatus} 
                    paymentResponse={this.state.paymentResponse}
                />
            </Fragment>
        );
    }
}

CheckOut.contextType = CustomerContext;

export default CheckOut;