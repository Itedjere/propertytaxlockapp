import React from 'react';

import {
    Row,
    Col,
    FormSelect,
} from "shards-react";

export default function PropertyDetails(props) {
    const { values, onInputChange } = props;
    return (
        <Row className="">
            <Col>
                <Row form>
                    <Col md="6" className="form-group">
                        <label htmlFor="accountNumber">Property Tax Account #</label>
                        <FormSelect 
                            id="accountNumber" 
                            name="accountNumber" 
                            value={values.accountNumber}
                            onChange={onInputChange}
                        >
                            {
                                values.properties.map((property, index) => (
                                    <option 
                                        value={property.Account_Num}
                                        key={index}
                                    >
                                        {`${property.Situs_Address}, ${property.Owner_CityState}`}
                                    </option>
                                ))
                            }
                        </FormSelect>
                    </Col>
                    <Col md="6" className="form-group">
                        <label htmlFor="propertytype">Property Type</label>
                        <FormSelect 
                            id="propertytype" 
                            name="propertytype" 
                            value={values.propertytype}
                            onChange={onInputChange}
                        >
                            <option value="">Select</option>
                            <option value="Single Family">Single Family</option>
                            <option value="Town House">Town House</option>
                            <option value="Half Duplex">Half Duplex</option>
                            <option value="Full Duplex">Full Duplex</option>
                            <option value="Condo">Condo</option>
                            <option value="Farm/Ranch">Farm/Ranch</option>
                        </FormSelect>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
