import React from 'react';
import { Link } from 'react-router-dom';

import {
    Row,
    Col,
    FormCheckbox,
} from "shards-react";

export default function PropertySuffers(props) {
    const { values, onInputChange } = props;
    return (
        <Row className="pt-3">
            <Col>
                <h6>Does The Property Suffer From Any Of The Following? Check All That Apply.</h6>
                <Row form>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="interiorFoundationIssues" 
                            checked={values.interiorFoundationIssues} 
                            onChange={onInputChange} 
                        >
                            Interior Foundation Issues
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="exteriorFoundationIssues" 
                            checked={values.exteriorFoundationIssues} 
                            onChange={onInputChange} 
                        >
                            Exterior Foundation Issues
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="electricalIssues" 
                            checked={values.electricalIssues} 
                            onChange={onInputChange} 
                        >
                            Electrical Issues
                        </FormCheckbox>
                    </Col><Col md="3" className="form-group">
                        <FormCheckbox 
                            name="plumbingIssues" 
                            checked={values.plumbingIssues} 
                            onChange={onInputChange} 
                        >
                            Plumbing Issues
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="defectiveRoof" 
                            checked={values.defectiveRoof} 
                            onChange={onInputChange} 
                        >
                            Defective Roof
                        </FormCheckbox>
                    </Col>
                    <Col md="3" className="form-group">
                        <FormCheckbox 
                            name="subjectToFlooding" 
                            checked={values.subjectToFlooding} 
                            onChange={onInputChange} 
                        >
                            Subject To Flooding
                        </FormCheckbox>
                    </Col>
                    <Col md="6" className="form-group">
                        <FormCheckbox 
                            name="backsToCommercialProperty" 
                            checked={values.backsToCommercialProperty} 
                            onChange={onInputChange} 
                        >
                            Backs To Commercial Property
                        </FormCheckbox>
                    </Col>
                    <p>If you checked any of the boxes above, <strong>providing pictues or estimates for repair</strong> can be helpful in lowering your property taxes. Please send all supporting documentation to us as soon as possible. Pictures can be uploaded and sent to our office via the <Link to="/upload-documents">Upload Documents Section</Link></p>
                </Row>
            </Col>
        </Row>
    )
}
