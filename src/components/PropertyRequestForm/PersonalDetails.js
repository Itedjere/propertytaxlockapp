import React, { Fragment } from 'react';

import {
    Alert,
    Row,
    Col,
    FormInput,
} from "shards-react";

export default function PersonalDetails(props) {
    const { values, onInputChange } = props;
    return (
        <Fragment>
            <Row className="pt-3">
                <Col>
                    <Row form>
                        <Col md="4" className="form-group">
                            <label htmlFor="firstname">Firstname</label>
                            <FormInput 
                                id="firstname" 
                                placeholder="Firstname"
                                onChange={onInputChange}
                                name="firstname"
                                value={values.firstname} />
                        </Col>
                        <Col md="4" className="form-group">
                            <label htmlFor="lastname">Lastname</label>
                            <FormInput 
                                id="lastname" 
                                placeholder="Lastname"
                                onChange={onInputChange}
                                name="lastname"
                                value={values.lastname} />
                        </Col>
                        <Col md="4" className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <FormInput 
                                id="email" 
                                placeholder="Email Address"
                                onChange={onInputChange}
                                name="email"
                                value={values.email} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Alert theme="info">
                Please Review Your Answers Before Pressing Submit. Again, no fields are required, but you will not have the opportunity to edit your answers after pressing submit.
            </Alert>
        </Fragment>
    )
}
