import React from 'react';

import {
    Row,
    Col,
    FormCheckbox,
} from "shards-react";

export default function DescriptionInteriorProblems(props) {
    const { values, onInputChange } = props;
    return (
        <Row className="pt-3">
            <Col>
                <h6>Description Of Interior Problems.</h6>
                <Row form>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="petOdors"
                            checked={values.petOdors} 
                            onChange={onInputChange} 
                        >
                            Pet Odors
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="smokeOdors"
                            checked={values.smokeOdors} 
                            onChange={onInputChange} 
                        >
                            Smoke Odors
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="cracksInSheetrocks"
                            checked={values.cracksInSheetrocks} 
                            onChange={onInputChange} 
                        >
                            Cracks In Sheetrocks
                        </FormCheckbox>
                    </Col><Col md="3" className="form-group">
                        <FormCheckbox 
                            name="wallsNeedPaint"
                            checked={values.wallsNeedPaint} 
                            onChange={onInputChange} 
                        >
                            Walls Need Paint
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="CarpetNeedReplace"
                            checked={values.CarpetNeedReplace} 
                            onChange={onInputChange} 
                        >
                            Carpet Need Replace
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="woodFloorRefinishing"
                            checked={values.woodFloorRefinishing} 
                            onChange={onInputChange} 
                        >
                            Wood Floors Need Refinishing
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="TileColorOutdated"
                            checked={values.TileColorOutdated} 
                            onChange={onInputChange} 
                        >
                            Tile Color Is Outdated
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="DoorsNeedRepair"
                            checked={values.DoorsNeedRepair} 
                            onChange={onInputChange} 
                        >
                            Doors Need Repair
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="CabinetNeedRepair"
                            checked={values.CabinetNeedRepair} 
                            onChange={onInputChange} 
                        >
                            Cabinets Need Repair
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="windowNeedRepair"
                            checked={values.windowNeedRepair} 
                            onChange={onInputChange} 
                        >
                            Windows Need Repair
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="windowNeedReplacement"
                            checked={values.windowNeedReplacement} 
                            onChange={onInputChange} 
                        >
                            Windows Need Replacement
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="chimneyNeedCleaning"
                            checked={values.chimneyNeedCleaning} 
                            onChange={onInputChange} 
                        >
                            Chimney Needs Cleaning
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="electricalWiringProblems"
                            checked={values.electricalWiringProblems} 
                            onChange={onInputChange} 
                        >
                            Electrical Wiring Problems
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="plumbingNeedsRepair"
                            checked={values.plumbingNeedsRepair} 
                            onChange={onInputChange} 
                        >
                            Plumbing Needs Repair
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="bathrooms"
                            checked={values.bathrooms} 
                            onChange={onInputChange} 
                        >
                            Bathrooms
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="kitchen"
                            checked={values.kitchen} 
                            onChange={onInputChange} 
                        >
                            Kitchen
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="faucets"
                            checked={values.faucets} 
                            onChange={onInputChange} 
                        >
                            Faucets
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="counterTopsNeedReplaced"
                            checked={values.counterTopsNeedReplaced} 
                            onChange={onInputChange} 
                        >
                            Countertops Need Replaced
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="showerTub"
                            checked={values.showerTub} 
                            onChange={onInputChange} 
                        >
                            Shower/Tub
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="LightFixturesNeedReplaced"
                            checked={values.LightFixturesNeedReplaced} 
                            onChange={onInputChange} 
                        >
                            Light Fixtures Need Replaced
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="ApplicancesNeedRepairReplaced"
                            checked={values.ApplicancesNeedRepairReplaced} 
                            onChange={onInputChange} 
                        >
                            Appliances Need Repair/Replaced
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="Toilets"
                            checked={values.Toilets} 
                            onChange={onInputChange} 
                        >
                            Toilets
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="MirroNeedReplaced"
                            checked={values.MirroNeedReplaced} 
                            onChange={onInputChange} 
                        >
                            Mirror Need Replaced
                        </FormCheckbox>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
