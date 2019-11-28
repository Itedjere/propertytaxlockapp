import React from 'react';

import {
    Row,
    Col,
    FormCheckbox,
    FormTextarea,
} from "shards-react";

export default function LotDescription(props) {
    const { values, onInputChange } = props;
    return (
        <Row className="pt-3">
            <Col>
                <h6>Lot Description</h6>
                <Row form>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="gatedCommunity" checked={values.gatedCommunity} onChange={onInputChange}>
                            Gated Community
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="creek" checked={values.creek} onChange={onInputChange}>
                            Creek
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="Lake" checked={values.Lake} onChange={onInputChange}>
                            Lake
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="pond" checked={values.pond} onChange={onInputChange}>
                            Pond
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="parkView" checked={values.parkView} onChange={onInputChange}>
                            Park View
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="golf" checked={values.golf} onChange={onInputChange}>
                            Golf
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="largeLot" checked={values.largeLot} onChange={onInputChange}>
                            Large Lot
                        </FormCheckbox>
                    </Col><Col md="3" className="form-group">
                        <FormCheckbox name="irregularSize" checked={values.irregularSize} onChange={onInputChange}>
                            Irregular Size
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="Corner" checked={values.Corner} onChange={onInputChange}>
                            Corner
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="greenBelt" checked={values.greenBelt} onChange={onInputChange}>
                            Green Belt
                        </FormCheckbox>
                    </Col>
                    <Col md="12" className="form-group">
                        <label>Lot Description (Other)</label>
                        <FormTextarea 
                            placeholder="Please Describe Your Lot If The Selection Do Not Apply" 
                            name="describeLot"
                            value={values.describeLot}
                            onChange={onInputChange} />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
