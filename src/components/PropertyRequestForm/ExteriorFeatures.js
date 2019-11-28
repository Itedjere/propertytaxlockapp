import React from 'react';

import {
    Row,
    Col,
    FormCheckbox,
    FormTextarea,
} from "shards-react";

export default function ExteriorFeatures(props) {
    const { values, onInputChange } = props;
    return (
        <Row className="pt-3">
            <Col>
                <h6>Exterior Features</h6>
                <Row form>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="woodframeExterior" checked={values.woodframeExterior} onChange={onInputChange}>
                            Wood Frame Exterior
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="brickExterior" checked={values.brickExterior} onChange={onInputChange}>
                            Brick Exterior
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="stoneExterior" checked={values.stoneExterior} onChange={onInputChange}>
                            Stone Exterior
                        </FormCheckbox>
                    </Col><Col md="3" className="form-group">
                        <FormCheckbox name="stuccoExterior" checked={values.stuccoExterior} onChange={onInputChange}>
                            Stucco / Concreate Exterior
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="guestquaters" checked={values.guestquaters} onChange={onInputChange}>
                            Guest Quaters
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="outdoorkitchen" checked={values.outdoorkitchen} onChange={onInputChange}>
                            Outdoor Kitchen
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="stableBan" checked={values.stableBan} onChange={onInputChange}>
                            Stable / Ban
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="storageBuilding" 
                            checked={values.storageBuilding} 
                            onChange={onInputChange}
                        >
                            Storage Building
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="tennisCourt" checked={values.tennisCourt} onChange={onInputChange}>
                            Tennis Court
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="boatDock" checked={values.boatDock} onChange={onInputChange}>
                            Boat Dock
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="boatDockWLift" checked={values.boatDockWLift} onChange={onInputChange}>
                            Boat Dock w/Lift
                        </FormCheckbox>
                    </Col><Col md="3" className="form-group">
                        <FormCheckbox name="deck" checked={values.deck} onChange={onInputChange}>
                            Deck
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="Elevator" checked={values.Elevator} onChange={onInputChange}>
                            Elevator
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="Pool" checked={values.Pool} onChange={onInputChange}>
                            Pool
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="Spa" checked={values.Spa} onChange={onInputChange}>
                            Spa
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="septicTank" checked={values.septicTank} onChange={onInputChange}>
                            Septic Tank
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox name="Workshop" checked={values.Workshop} onChange={onInputChange}>
                            Workshop
                        </FormCheckbox>
                    </Col>
                    <Col md="12" className="form-group">
                        <label>Other Exterior Features</label>
                        <FormTextarea placeholder="Please Provide Any Exterior Features That Aren't Listed" name="otherExteriorFeatures" value={values.otherExteriorFeatures} onChange={onInputChange} />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
