import React from 'react'

import {
    Row,
    Col,
    FormTextarea,
    FormRadio,
} from "shards-react";

export default function ConditionOfHome(props) {
    const { values, onRadioChange, onInputChange } = props;
    return (
        <Row className="pt-3">
            <Col>
                <h6>Please Rate The Current Condition of Home In Comparison To Surrounding properties with Similar Construction And Age</h6>
                <Row form>
                    <Col md="2" className="form-group">
                        <FormRadio
                            name="condition" 
                            checked={values.condition === 'poor'}
                            onChange={() => onRadioChange('poor')}
                        >
                            Poor
                        </FormRadio>
                    </Col>
                    <Col md="2" className="form-group">
                        <FormRadio
                            name="condition"
                            checked={values.condition === 'fair'}
                            onChange={() => onRadioChange('fair')}
                        >
                            Fair
                        </FormRadio>
                    </Col>
                    <Col md="2" className="form-group">
                        <FormRadio
                            name="condition"
                            checked={values.condition === 'average'}
                            onChange={() => onRadioChange('average')}
                        >
                            Average
                        </FormRadio>
                    </Col>
                    <Col md="2" className="form-group">
                        <FormRadio
                            name="condition"
                            checked={values.condition === 'good'}
                            onChange={() => onRadioChange('good')}
                        >
                            Good
                        </FormRadio>
                    </Col>
                    <Col md="2" className="form-group">
                        <FormRadio
                            name="condition"
                            checked={values.condition === 'very good'}
                            onChange={() => onRadioChange('very good')}
                        >
                            Very Good
                        </FormRadio>
                    </Col>
                    <Col md="2" className="form-group">
                        <FormRadio
                            name="condition"
                            checked={values.condition === 'excellent'}
                            onChange={() => onRadioChange('excellent')}
                        >
                            Excellent
                        </FormRadio>
                    </Col>
                </Row>
                <Row form>
                    <Col md="12" className="form-group">
                        <label>Other Comments Concerning Condition And Surrounding</label>
                        <FormTextarea 
                            placeholder="Other Comments Concerning Condition And Surrounding"
                            name="commentsConditionsHome"
                            value={values.commentsConditionsHome}
                            onChange={onInputChange} />
                    </Col>
                </Row>
                <Row form>
                    <Col md="12" className="form-group">
                        <label>Please Indicate Any Other Reason(s) Why You Think Your Value Should Be Lowered</label>
                        <FormTextarea 
                            placeholder="Please Indicate Any Other Reason(s) Why You Think Your Value Should Be Lowered"
                            name="reasonsValueLowered"
                            value={values.reasonsValueLowered}
                            onChange={onInputChange} />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
