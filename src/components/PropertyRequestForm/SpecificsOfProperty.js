import React from 'react';

import {
    Row,
    Col,
    FormInput,
    FormSelect,
} from "shards-react";

export default function SpecificsOfProperty(props) {
    const { values, onInputChange } = props;
    return (
        <Row className="border-bottom pt-3">
            <Col>
                <h6>Please Provide Some Specifics About Your Property</h6>
                <Row form>
                    <Col md="4" className="form-group">
                        <label htmlFor="yourOpinionOfValue">What Is Your Opinion Of Value?</label>
                        <FormInput 
                            id="yourOpinionOfValue" 
                            placeholder="What Is Your Opinion Of Value?"
                            onChange={onInputChange} 
                            name="yourOpinionOfValue" 
                            value={values.yourOpinionOfValue} />
                    </Col>
                    <Col md="4" className="form-group">
                        <label htmlFor="totalLivingAreaSqFt">Total Living Area (Sq/Ft)</label>
                        <FormInput 
                            id="totalLivingAreaSqFt" 
                            placeholder="Total Living Area (Sq/Ft)"
                            onChange={onInputChange} 
                            name="totalLivingAreaSqFt" 
                            value={values.totalLivingAreaSqFt} />
                    </Col>
                    <Col md="4" className="form-group">
                        <label htmlFor="lotAreaSqFt">Lot Area (Sq/Ft)</label>
                        <FormInput 
                            id="lotAreaSqFt" 
                            placeholder="Lot Area (Sq/Ft)"
                            onChange={onInputChange} 
                            name="lotAreaSqFt" 
                            value={values.lotAreaSqFt} />
                    </Col>
                </Row>
                <Row form>
                    <Col md="4" className="form-group">
                        <label htmlFor="bathroomsFull">Number of Bathrooms (# Full)</label>
                        <FormInput 
                            id="bathroomsFull" 
                            placeholder="Bathrooms (# Full)" 
                            type="number"
                            min="0" 
                            name="bathroomsFull" 
                            value={values.bathroomsFull} 
                            onChange={onInputChange} />
                    </Col>
                    <Col md="4" className="form-group">
                        <label htmlFor="bathroomsHalf">Number of Bathrooms (# Half)</label>
                        <FormInput 
                            id="bathroomsHalf" 
                            placeholder="Bathrooms (# Half)" 
                            type="number" 
                            min="0" 
                            name="bathroomsHalf" 
                            value={values.bathroomsHalf} 
                            onChange={onInputChange} />
                    </Col>
                    <Col md="4" className="form-group">
                        <label htmlFor="bedrooms">Number of Bedrooms</label>
                        <FormInput 
                            id="bedrooms" 
                            placeholder="Bedrooms" 
                            type="number"
                            min="0" 
                            name="bedrooms" 
                            value={values.bedrooms} 
                            onChange={onInputChange} />
                    </Col>
                </Row>
                <Row form>
                    <Col md="4" className="form-group">
                        <label htmlFor="numStoreis">Number Of Stories</label>
                        <FormInput 
                            id="numStoreis" 
                            placeholder="Number Of Stories" 
                            type="number"
                            min="0" 
                            name="numStoreis"
                            value={values.numStoreis} 
                            onChange={onInputChange} />
                    </Col>
                    <Col md="4" className="form-group">
                        <label htmlFor="numFirePlaces">Numbers FirePlaces (# Indoors)</label>
                        <FormInput 
                            id="numFirePlaces" 
                            placeholder="FirePlaces (# Indoors)" 
                            name="numFirePlaces"
                            type="number"
                            min="0" 
                            value={values.numFirePlaces} 
                            onChange={onInputChange} />
                    </Col>
                    <Col md="4" className="form-group">
                        <label htmlFor="FirePlaces">Number FirePlaces # Ourdoors)</label>
                        <FormInput 
                            id="FirePlaces" 
                            placeholder="FirePlaces # Ourdoors)" 
                            name="FirePlaces"
                            type="number"
                            min="0" 
                            value={values.FirePlaces} 
                            onChange={onInputChange} />
                    </Col>
                </Row>
                <Row form>
                    <Col md="6" className="form-group">
                        <label htmlFor="basementType">Basement Type</label>
                        <FormSelect 
                            id="basementType" 
                            name="basementType" 
                            value={values.basementType} 
                            onChange={onInputChange}
                        >
                            <option value="">Select</option>
                            <option value="Single Family">Single Family</option>
                            <option value="Town House">Town House</option>
                            <option value="Half Duplex">Half Duplex</option>
                        </FormSelect>
                    </Col>
                    <Col md="6" className="form-group">
                        <label htmlFor="basementAreaSqFt">Basement Area (Sq/Ft)</label>
                        <FormInput 
                            id="basementAreaSqFt" 
                            placeholder="Basement Area (Sq/Ft)" 
                            type="number" 
                            min="0" 
                            value={values.basementAreaSqFt} 
                            name="basementAreaSqFt"
                            onChange={onInputChange} />
                    </Col>
                </Row>
                <Row form>
                    <Col md="6" className="form-group">
                        <label htmlFor="garageType">Garage Type</label>
                        <FormSelect 
                            id="garageType" 
                            name="garageType" 
                            value={values.garageType} 
                            onChange={onInputChange}
                        >
                            <option value="">Select</option>
                            <option value="Attached">Attached</option>
                            <option value="Detached">Detached</option>
                            <option value="Carport">Carport</option>
                        </FormSelect>
                    </Col>
                    <Col md="6" className="form-group">
                        <label htmlFor="numcars">Number Of Cars</label>
                        <FormInput 
                            id="numcars" 
                            placeholder="Number Of Cars" 
                            type="number" 
                            name="numcars" 
                            min="0"
                            value={values.numcars}
                            onChange={onInputChange} />
                    </Col>
                </Row>
                <Row form>
                    <Col md="6" className="form-group">
                        <label htmlFor="foundationType">Foundation Type</label>
                        <FormSelect 
                            id="foundationType" 
                            name="foundationType" 
                            value={values.foundationType} 
                            onChange={onInputChange}
                        >
                            <option value="">Select</option>
                            <option value="Slab">Slab</option>
                            <option value="CrawlSpace">CrawlSpace</option>
                            <option value="Closed">Closed</option>
                            <option value="Open">Open</option>
                            <option value="On Piers or Stilts">On Piers or Stilts</option>
                        </FormSelect>
                    </Col>
                    <Col md="6" className="form-group">
                        <label htmlFor="typeOfRoof">Type of Roof</label>
                        <FormSelect 
                            id="typeOfRoof" 
                            name="typeOfRoof" 
                            value={values.typeOfRoof} 
                            onChange={onInputChange}
                        >
                            <option value="">Select</option>
                            <option value="Tar And Gravel">Tar And Gravel</option>
                            <option value="Composition">Composition</option>
                            <option value="Slate">Slate</option>
                            <option value="Tile">Tile</option>
                            <option value="Wood Shake">Wood Shake</option>
                            <option value="Metal">Metal</option>
                        </FormSelect>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
