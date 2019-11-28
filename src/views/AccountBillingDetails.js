import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
} from "shards-react";

import { CustomerContext } from "../contexts/PDProvider";
import PageTitle from "../components/common/PageTitle";
import BillingDetailsForm from "../components/billing-details/BillingDetailsForm";
import BillingDetails from "../components/billing-details/BillingDetails";

class AccountBillingDetails extends React.Component {
  static contextType = CustomerContext;

  constructor(props) {
    super(props);
    this.state = {
      baseUrl: process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_SERVER_SANDBOX_URL : process.env.REACT_APP_SERVER_PRODUCTION_URL,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      city: '',
      state1: '',
      zipcode: '',
      updateType: 'bllingdetails',
      userId: null,
      jwt: '',
      alertVisible: false,
      alertMessage: '',
      alertType: 'success',
      modalErrorMsg: 'Sorry A Server Error Occured. Logout And Login Again If Error Persists',
      modalOpened: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.dismissAlert = this.dismissAlert.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    const appCredentials = JSON.parse(localStorage.getItem("appState"));
    if (appCredentials) {
      const customerId = appCredentials.customerId;
      const jwt = appCredentials.jwt;

      if (Object.keys(this.context.customer).length > 0) {
        this.setInitialState(this.context.customer, jwt, customerId);
      } else {
          axios.post(`${this.state.baseUrl}/woocommerce/GetCustomer.php`, {
            customerId: customerId,
            jwt
          })
          .then(response => {
            if (response.data.code === undefined) {
              this.context.setCustomer(response.data);
              this.setInitialState(response.data, jwt, customerId);
            } else if (response.data.code === "jwt_error") {
              // show an modal box
              let errorPayload = { 
                code: response.data.code, 
                message: response.data.message
              };
              console.log(errorPayload);

              this.setState({
                modalOpened: true
              })
            } else {
              // Woocommerce Error Present
              this.setState({
                alertVisible: true,
                alertMessage: response.data.messsage,
                alertType: 'danger',
              });
            }
          })
          .catch(error => {
            // Axios Error Present
            this.setState({
              alertVisible: true,
              alertMessage: 'An Error Was Encountered. Please Try Again Later',
              alertType: 'danger',
            });
          });
      }
    }
  }

  setInitialState = (response, jwt, customerId) => {
    const { first_name, last_name, email, phone, company, address_1, city, state, postcode } = response.billing;
    this.setState({
      firstName: first_name,
      lastName: last_name,
      address: address_1,
      city: city,
      state1: state,
      zipcode: postcode,
      email: email,
      phone: phone,
      company: company,
      userId: customerId,
      jwt,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleFormSubmission(values, actions) {
    // Make A Post Request
    let newState = {...this.state, ...values};
    // console.log(newState);
    axios.post(`${this.state.baseUrl}/woocommerce/UpdateCustomer.php`, newState)
    .then(response => {
      if (response.data.code === undefined) {
        // Update both the context and the state
        let jwt = this.state.jwt;
        let customerId = this.state.userId;

        this.context.setCustomer(response.data);
        this.setInitialState(response.data, jwt, customerId);

        // No Error
        this.setState({
          alertVisible: true,
          alertMessage: 'Your Billing Details Has Been Updated Successfully',
          alertType: 'success',
        });
        actions.setSubmitting(false);

      } else if (response.data.code === "jwt_error") {
        // show an modal box
        let errorPayload = { 
          code: response.data.code, 
          message: response.data.message
        };
        console.log(errorPayload);

        this.setState({
          modalOpened: true
        })
        actions.setSubmitting(false);
      } else {
        // Woocommerce Error Present
        this.setState({
          alertVisible: true,
          alertMessage: response.data.messsage,
          alertType: 'danger',
        });
        actions.setSubmitting(false);
      }
    })
    .catch(error => {
      // Axios Error Present
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

  toggleModal() {
    this.setState({ modalOpened: false })
  }

  render() {
    const SignupSchema = Yup.object().shape({
      firstName: Yup.string()
        .required('Enter Your Firstname'),
      lastName: Yup.string()
        .required('Enter Your Lastname'),
      email: Yup.string()
        .email('Invalid Email Address')
        .required('Enter Your Email Address'),
      phone: Yup.string()
        .matches(/[0-9]/, 'Digits Only')
        .required('Enter Your Phone Number'),
    });
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title="Billing Details" subtitle="Account" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        <Row>
          <Col lg="4">
            <BillingDetails 
              details={this.state}
            />
          </Col>
          <Col lg="8">
            <Formik
                initialValues={{
                  firstName: this.state.firstName,
                  lastName: this.state.lastName,
                  email: this.state.email,
                  company: this.state.company,
                  address: this.state.address,
                  city: this.state.city,
                  state1: this.state.state1,
                  zipcode: this.state.zipcode,
                  phone: this.state.phone
                }}
                enableReinitialize={true}
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
                  <BillingDetailsForm 
                    state={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    isSubmitting={isSubmitting}
                    handleFormSubmission={this.handleFormSubmission}
                    handleInputChange={this.handleInputChange}
                    dismissAlert={this.dismissAlert}
                    USStates={this.context.USStates}
                    alert={{alertVisible: this.state.alertVisible, alertMessage: this.state.alertMessage, alertType: this.state.alertType}}
                  />
                )
              }
            </Formik>
          </Col>
        </Row>
        <Modal centered open={this.state.modalOpened} toggle={this.toggleModal}>
          <ModalHeader>Error</ModalHeader>
          <ModalBody>
            <p>{this.state.modalErrorMsg}</p>
            <Link to="/logout" className="btn btn-primary">Logout</Link>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
};

AccountBillingDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

AccountBillingDetails.defaultProps = {
  title: "Billing Details"
};

export default AccountBillingDetails;