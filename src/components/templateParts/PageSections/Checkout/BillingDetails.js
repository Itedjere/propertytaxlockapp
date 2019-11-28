import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import { CustomerContext } from '../../../../contexts/PDProvider';

class BillingDetails extends Component {
    render() {
        const { USStates } = this.context; 
        const { errors, touched, handleBlur, handleChange, values } = this.props;
        return (
            <div style={{ backgroundColor: '#ffffff', padding: '15px', height: '100%' }}>
                <h4>Billing Details</h4>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="firstname">Firstname<span>*</span></label>
                        <Form.Control 
                            type="text" 
                            name="firstName" 
                            id="firstname" 
                            placeholder="Firstname" 
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            isInvalid={errors.firstName && touched.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                        </Form.Control.Feedback>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="lastname">Lastname<span>*</span></label>
                        <Form.Control 
                            type="text" 
                            name="lastName" 
                            id="lastname" 
                            placeholder="Lastname" 
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
                <div className="form-group">
                    <label htmlFor="inputAddress">Company Name (optional)</label>
                    <Form.Control 
                        type="text" 
                        name="company" 
                        id="inputAddress" 
                        placeholder="Company Name" 
                        value={values.company}
                        onChange={handleChange}
                        onBlur={handleBlur} 
                        isInvalid={errors.company && touched.company}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.company}
                    </Form.Control.Feedback>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Street Address<span>*</span></label>
                    <Form.Control 
                        type="text" 
                        name="address" 
                        id="address" 
                        placeholder="House Number and Street Name" 
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={errors.address && touched.address}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.address}
                    </Form.Control.Feedback>
                </div>
                <div className="form-group">
                    <Form.Control 
                        type="text" 
                        name="address2" 
                        id="inputAddress2" 
                        placeholder="Apartment, Suite, Unit etc" 
                        value={values.address2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={errors.address2 && touched.address2}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.address2}
                    </Form.Control.Feedback>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="inputCity">City<span>*</span></label>
                        <Form.Control 
                            type="text" 
                            name="city" 
                            id="inputCity" 
                            placeholder="city" 
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={errors.city && touched.city}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.city}
                        </Form.Control.Feedback>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputState">State<span>*</span></label>
                        <Form.Control 
                            as="select" 
                            className="custom-select" 
                            name="state" 
                            id="inputState"
                            value={values.state}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={errors.state && touched.state}
                        >
                            <option>Choose...</option>
                            {USStates.map((state, index) => (
                                <option value={state.abbr} key={index}>
                                    {state.name}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors.state}
                        </Form.Control.Feedback>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputZip">Zip<span>*</span></label>
                        <Form.Control 
                            type="text" 
                            name="zipcode" 
                            id="inputZip" 
                            placeholder="Zip" 
                            value={values.zipcode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={errors.zipcode && touched.zipcode}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.zipcode}
                        </Form.Control.Feedback>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone<span>*</span></label>
                    <Form.Control 
                        type="text" 
                        name="phone" 
                        id="phone" 
                        placeholder="Phone Number" 
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={errors.phone && touched.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.phone}
                    </Form.Control.Feedback>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address<span>*</span></label>
                    <Form.Control 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Email Address" 
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={errors.email && touched.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password<span>*</span></label>
                    <Form.Control 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Password" 
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={errors.password && touched.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password<span>*</span></label>
                    <Form.Control 
                        type="password" 
                        name="password1" 
                        id="password2" 
                        placeholder="Confirm Password" 
                        value={values.password1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={errors.password1 && touched.password1}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password1}
                    </Form.Control.Feedback>
                </div>
            </div>
        );
    }
}

BillingDetails.contextType = CustomerContext;

export default BillingDetails;