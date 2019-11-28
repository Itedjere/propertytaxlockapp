import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import { CustomerContext } from '../../../../contexts/PDProvider';

class CreditCardDetails extends Component {
    render() {
        const { errors, touched, handleBlur, handleChange, values } = this.props;
        const { Months } = this.context;
        return (
            <div className="mt-5">
                <p>
		            <strong>Credit Card </strong>
                    <img src={require('../../../../assets/images/credit-cards/discover.png')} alt="discover" />
                    <img src={require('../../../../assets/images/credit-cards/amex.png')} alt="amex" />
                    <img src={require('../../../../assets/images/credit-cards/mastercard.png')} alt="mastercard" />
                    <img src={require('../../../../assets/images/credit-cards/visa.png')} alt="visa" />	
                </p>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="cardnumber">Card Number<span>*</span></label>
                        <Form.Control 
                            type="tel" 
                            name="cardnumber"  
                            id="cardnumber" 
                            placeholder="CREDIT CARD NUMBER"
                            value={values.cardnumber}
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            isInvalid={errors.cardnumber && touched.cardnumber} 
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.cardnumber}
                        </Form.Control.Feedback>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="expirymonth">Expiry MM<span>*</span></label>
                        <Form.Control 
                            as="select" 
                            className="custom-select" 
                            name="expirymonth" 
                            id="expirymonth"
                            value={values.expirymonth}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={errors.expirymonth && touched.expirymonth}
                        >
                            <option value="">Choose Month...</option>
                            {Months.map((month, index) => (
                                <option value={month.value} key={index}>
                                    {month.name}
                                </option>
                            ))}
                        </Form.Control>
                        {/* <Form.Control 
                            type="text" 
                            name="expirymonth" 
                            id="expirymonth" 
                            placeholder="MM" 
                            value={values.expirymonth}
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            isInvalid={errors.expirymonth && touched.expirymonth} 
                        /> */}
                        <Form.Control.Feedback type="invalid">
                            {errors.expirymonth}
                        </Form.Control.Feedback>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="expiryyear">Expiry YYYY<span>*</span></label>
                        <Form.Control 
                            type="tel" 
                            name="expiryyear" 
                            id="expiryyear" 
                            placeholder="YYYY" 
                            value={values.expiryyear}
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            isInvalid={errors.expiryyear && touched.expiryyear} 
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.expiryyear}
                        </Form.Control.Feedback>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="cardcode">Card Code<span>*</span></label>
                        <Form.Control 
                            type="tel" 
                            name="cardcode" 
                            id="cardcode" 
                            placeholder="CVC" 
                            value={values.cardcode}
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            isInvalid={errors.cardcode && touched.cardcode} 
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.cardcode}
                        </Form.Control.Feedback>
                    </div>
                </div>
            </div>
        );
    }
}
CreditCardDetails.contextType = CustomerContext;

export default CreditCardDetails;