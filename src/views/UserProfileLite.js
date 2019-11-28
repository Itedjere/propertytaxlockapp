import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import PropTypes from "prop-types";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { CustomerContext } from "../contexts/PDProvider";
import Spinners from '../components/templateParts/Spinners';

import {
  Alert,
  Button,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  FormGroup,
  FormFeedback,
  FormInput,
  Modal,
  ModalBody,
  ModalHeader,
} from "shards-react";

import PageTitle from "../components/common/PageTitle";

class UserProfileLite extends React.Component {
  static contextType = CustomerContext;

  constructor(props) {
    super(props);
    this.state = {
      baseUrl: process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_SERVER_SANDBOX_URL : process.env.REACT_APP_SERVER_PRODUCTION_URL,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state1: '',
      zipcode: '',
      updateType: 'userprofile',
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
          customerId,
          jwt,
        })
        .then(response => {
          if (response.data.code === undefined) {
            this.context.setCustomer(response.data);
            this.setInitialState(response.data, jwt, customerId);
          } else if (response.data.code === "jwt_error")  {
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
    // populate the state
    const { first_name, last_name, email, billing, } = response;
    this.setState({
      firstName: first_name,
      lastName: last_name,
      email: email,
      phone: billing.phone,
      address: billing.address_1,
      city: billing.city,
      state1: billing.state,
      zipcode: billing.postcode,
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
    let newState = {...this.state, ...values};
    console.log(newState);
    // Make A Post Request
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
          alertMessage: 'Your Profile Has Been Updated Successfully',
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
    const { title } = this.props;
    
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
          <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        <Row>
          <Col lg="12">
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
                              firstName: this.state.firstName,
                              lastName: this.state.lastName,
                              email: this.state.email,
                              phone: this.state.phone,
                              address: this.state.address,
                              city: this.state.city,
                              state1: this.state.state1,
                              zipcode: this.state.zipcode,
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
                            <Form>
                              <Row form>
                                {/* First Name */}
                                <Col md="6" className="form-group">
                                  <label htmlFor="feFirstName">First Name</label>
                                  <FormInput
                                    type="text"
                                    id="feFirstName"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    invalid={errors.firstName && touched.firstName}
                                  />
                                  {errors.firstName && touched.firstName ? (
                                      <FormFeedback>{errors.firstName}</FormFeedback>
                                  ) : null}
                                </Col>
                                {/* Last Name */}
                                <Col md="6" className="form-group">
                                  <label htmlFor="feLastName">Last Name</label>
                                  <FormInput
                                    id="feLastName"
                                    type="text"
                                    placeholder="Last Name"
                                    name="lastName"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    invalid={errors.lastName && touched.lastName}
                                  />
                                  {errors.lastName && touched.lastName ? (
                                      <FormFeedback>{errors.lastName}</FormFeedback>
                                  ) : null}
                                </Col>
                              </Row>
                              <Row form>
                                {/* Email */}
                                <Col md="6" className="form-group">
                                  <label htmlFor="feEmail">Email</label>
                                  <FormInput
                                    type="email"
                                    id="feEmail"
                                    placeholder="Email Address"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    invalid={errors.email && touched.email}
                                  />
                                  {errors.email && touched.email ? (
                                      <FormFeedback>{errors.email}</FormFeedback>
                                  ) : null}
                                </Col>
                                {/* Password */}
                                <Col md="6" className="form-group">
                                  <label htmlFor="phone">Phone Number</label>
                                  <FormInput
                                    type="text"
                                    id="phone"
                                    placeholder="Phone Number"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    invalid={errors.phone && touched.phone}
                                  />
                                  {errors.phone && touched.phone ? (
                                      <FormFeedback>{errors.phone}</FormFeedback>
                                  ) : null}
                                </Col>
                              </Row>
                              <FormGroup>
                                <label htmlFor="feAddress">Your Home Address</label>
                                <Field
                                  id="feAddress"
                                  type="text"
                                  name="address"
                                  className="form-control" 
                                  placeholder="House Number And Street Name"
                                />
                              </FormGroup>
                              <Row form>
                                {/* City */}
                                <Col md="6" className="form-group">
                                  <label htmlFor="feCity">City</label>
                                  <Field
                                    id="feCity"
                                    type="text"
                                    name="city"
                                    className="form-control" 
                                    placeholder="City"
                                  />
                                </Col>
                                {/* State */}
                                <Col md="4" className="form-group">
                                  <label htmlFor="feInputState">State</label>
                                  <Field  
                                    id="feInputState" 
                                    component="select"
                                    name="state1"
                                    className="form-control custom-select"
                                  >
                                    <option>Choose...</option>
                                    {this.context.USStates.map((state, index) => (
                                      <option 
                                        value={state.abbr}
                                        key={index}
                                      >
                                          {state.name}
                                      </option>
                                    ))}
                                  </Field>
                                </Col>
                                {/* Zip Code */}
                                <Col md="2" className="form-group">
                                  <label htmlFor="feZipCode">Zip</label>
                                  <Field
                                    id="feZipCode"
                                    placeholder="Zip"
                                    name="zipcode"
                                    type="text"
                                    className="form-control" 
                                  />
                                </Col>
                              </Row>
                              <Button 
                                theme="primary" 
                                type="submit"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? (<Fragment><Spinners /> Please Wait...</Fragment>) : 'Update Account'}
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

UserProfileLite.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserProfileLite.defaultProps = {
  title: "Account Details"
};

export default UserProfileLite;
