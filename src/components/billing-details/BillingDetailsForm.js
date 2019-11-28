import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Form, Field } from "formik";
import Spinners from '../templateParts/Spinners';
import {
  Alert,
  Button,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  FormGroup,
  FormInput,
  FormFeedback,
} from "shards-react";

const BillingDetailsForm = (props) => (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{props.title}</h6>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <Row form>
                {/* First Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feFirstName">First Name</label>
                  <FormInput
                    id="feFirstName"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={props.state.firstName}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    invalid={props.errors.firstName && props.touched.firstName}
                  />
                  {props.errors.firstName && props.touched.firstName ? (
                      <FormFeedback>{props.errors.firstName}</FormFeedback>
                  ) : null}
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Last Name</label>
                  <FormInput
                    id="feLastName"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={props.state.lastName}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    invalid={props.errors.lastName && props.touched.lastName}
                  />
                  {props.errors.lastName && props.touched.lastName ? (
                      <FormFeedback>{props.errors.lastName}</FormFeedback>
                  ) : null}
                </Col>
              </Row>
              <Row form>
                {/* First Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="email">Email</label>
                  <FormInput
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    value={props.state.email}
                    name="email"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    invalid={props.errors.email && props.touched.email}
                  />
                  {props.errors.email && props.touched.email ? (
                      <FormFeedback>{props.errors.email}</FormFeedback>
                  ) : null}
                </Col>
                {/* Email */}
                <Col md="6" className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <FormInput
                    id="phone"
                    type="text"
                    placeholder="Phone Number"
                    value={props.state.phone}
                    name="phone"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    invalid={props.errors.phone && props.touched.phone}
                  />
                  {props.errors.phone && props.touched.phone ? (
                      <FormFeedback>{props.errors.phone}</FormFeedback>
                  ) : null}
                </Col>
              </Row>
              <FormGroup>
                <label htmlFor="company">Company</label>
                <Field
                  id="company"
                  type="text"
                  placeholder="Company Name"
                  name="company"
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="feAddress">Address</label>
                <Field
                  id="feAddress"
                  type="text"
                  name="address"
                  placeholder="House Number And Street Name"
                  className="form-control"
                />
              </FormGroup>
              <Row form>
                {/* City */}
                <Col md="4" className="form-group">
                  <label htmlFor="feCity">City</label>
                  <Field
                    id="feCity"
                    type="text"
                    name="city"
                    placeholder="City"
                    className="form-control"
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
                    {props.USStates.map((state, index) => (
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
                <Col md="4" className="form-group">
                  <label htmlFor="feZipCode">Zip</label>
                  <Field
                    id="feZipCode"
                    type="text"
                    name="zipcode"
                    placeholder="Zip"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Button 
                theme="primary" 
                type="submit"
                disabled={props.isSubmitting}
              >
                {props.isSubmitting ? (<Fragment><Spinners /> Please Wait...</Fragment>) : 'Update Billing'}
              </Button>
            </Form>
            <Alert 
              dismissible={props.dismissAlert} 
              open={props.alert.alertVisible} 
              theme={props.alert.alertType}
              className="mt-3"
            >
              { props.alert.alertMessage }
            </Alert>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

BillingDetailsForm.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

BillingDetailsForm.defaultProps = {
  title: "Billing Details"
};

export default BillingDetailsForm;
