import React from 'react';

import {
    Row,
    Col,
    FormCheckbox,
    FormInput,
} from "shards-react";

function StatusOfProperty(props) {
    const { values, onInputChange } = props;
    return (
        <Row className="border-bottom pt-3">
            <Col>
                <h6>Please Indicate The Status Of The Property By Checking All Applicable Boxes That Have Occurred Within The Past 2 Years</h6>
                <Row form>
                    <Col md="4" className="form-group">
                        <label htmlFor="recentPurchasedCost">Recently Purchased For $</label>
                        <FormInput 
                            id="recentPurchasedCost" 
                            placeholder="Recently Purchased For $"
                            name="recentPurchasedCost"
                            value={values.recentPurchasedCost}
                            onChange={onInputChange} />
                    </Col>
                    <Col md="4" className="form-group">
                        <label htmlFor="currentListedSaleCost">Currently Listed For Sale At $</label>
                        <FormInput 
                            id="currentListedSaleCost" 
                            placeholder="Currently Listed For Sale At $"
                            name="currentListedSaleCost"
                            value={values.currentListedSaleCost}
                            onChange={onInputChange} />
                    </Col>
                    <Col md="4" className="form-group">
                        <label htmlFor="recentListedCost">Recently Listed At $, But Taken Off Market</label>
                        <FormInput 
                            id="recentListedCost" 
                            placeholder="Recently Listed At $, But Taken Off Market"
                            name="recentListedCost"
                            value={values.recentListedCost}
                            onChange={onInputChange} />
                    </Col>
                </Row>
                <Row form>
                    <Col md="4" className="form-group">
                        <FormCheckbox 
                            name="rentalProperty" 
                            checked={values.rentalProperty} 
                            onChange={onInputChange}
                        >
                            Rental Property
                        </FormCheckbox>
                    </Col>
                    <Col md="4" className="form-group">
                        <FormCheckbox 
                            name="obtainedPermits" 
                            checked={values.obtainedPermits} 
                            onChange={onInputChange}
                        >
                            Obtained Permits
                        </FormCheckbox>
                    </Col>
                    <Col md="4" className="form-group">
                        <FormCheckbox 
                            name="subtiantialImprovements" 
                            checked={values.subtiantialImprovements} 
                            onChange={onInputChange}
                        >
                            Substantial Improvements
                        </FormCheckbox>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default StatusOfProperty

