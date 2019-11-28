import React from 'react';

import {
    Row,
    Col,
    FormCheckbox,
} from "shards-react";

export default function DescriptionExteriorProblems(props) {
    const { values, onInputChange } = props;
    return (
        <Row className="pt-3">
            <Col>
                <h6>Description Of Exterior Problems.</h6>
                <Row form>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="landscapingIsDead" 
                            checked={values.landscapingIsDead} 
                            onChange={onInputChange}
                        >
                            Landscaping is dead
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="landscapingIsBelowTypical" 
                            checked={values.landscapingIsBelowTypical} 
                            onChange={onInputChange}
                        >
                            Landscaping is below typical
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="ExteriorNeedPaint" 
                            checked={values.ExteriorNeedPaint} 
                            onChange={onInputChange}
                        >
                            Exterior Needs Paint
                        </FormCheckbox>
                    </Col><Col md="3" className="form-group">
                        <FormCheckbox 
                            name="exteriorWoodNeedsRepair" 
                            checked={values.exteriorWoodNeedsRepair} 
                            onChange={onInputChange}
                        >
                            Exterior Wood Needs Repair
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="roofNeedsPaint" 
                            checked={values.roofNeedsPaint} 
                            onChange={onInputChange}
                        >
                            Roof Needs Paint
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="roofNeedsReplacement" 
                            checked={values.roofNeedsReplacement} 
                            onChange={onInputChange}
                        >
                            Roof Needs Replacement
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="minorFoundationSettling" 
                            checked={values.minorFoundationSettling} 
                            onChange={onInputChange}
                        >
                            Minor Foundation Settling
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="majorFoundationSettling" 
                            checked={values.majorFoundationSettling} 
                            onChange={onInputChange}
                        >
                            Major Foundation Settling
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="drivewayMinorCracks" 
                            checked={values.drivewayMinorCracks} 
                            onChange={onInputChange}
                        >
                            Driveway Minor Cracks
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="drivewayMajorCracks" 
                            checked={values.drivewayMajorCracks} 
                            onChange={onInputChange}
                        >
                            Driveway Major Cracks
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="fenceNeedsRepair" 
                            checked={values.fenceNeedsRepair} 
                            onChange={onInputChange}
                        >
                            Fence Needs Repair
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="fenceNeedsReplacement" 
                            checked={values.fenceNeedsReplacement} 
                            onChange={onInputChange}
                        >
                            Fence Needs Replaced
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="frontDoorNeedsRepair" 
                            checked={values.frontDoorNeedsRepair} 
                            onChange={onInputChange}
                        >
                            Front Door Needs Repair
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="frontDoorNeedsReplacement" 
                            checked={values.frontDoorNeedsReplacement} 
                            onChange={onInputChange}
                        >
                            Front Door Needs Replaced
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="poolNeedsNewEquipment" 
                            checked={values.poolNeedsNewEquipment} 
                            onChange={onInputChange}
                        >
                            Pool Needs New Equipment
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="poolNeedsResurfaced" 
                            checked={values.poolNeedsResurfaced} 
                            onChange={onInputChange}
                        >
                            Pool Needs Resurfaced
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="shuttersNeedRepairReplacement" 
                            checked={values.shuttersNeedRepairReplacement} 
                            onChange={onInputChange}
                        >
                            Shutters Needs Repair/Replacement
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="guttersNeedRepairReplacement" 
                            checked={values.guttersNeedRepairReplacement} 
                            onChange={onInputChange}
                        >
                            Gutters Needs Repair/Replacement
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="sprinklerSystemNeedRepair" 
                            checked={values.sprinklerSystemNeedRepair} 
                            onChange={onInputChange}
                        >
                            Sprinkler System Need Repair
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="garageDoorNeedRepair" 
                            checked={values.garageDoorNeedRepair} 
                            onChange={onInputChange}
                        >
                            Garage Door Needs Repair
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="garageDoorOpenersNeedRepair" 
                            checked={values.garageDoorOpenersNeedRepair} 
                            onChange={onInputChange}
                        >
                            Garage Door Openers Need Repair
                        </FormCheckbox>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
