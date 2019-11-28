import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import Spinners from '../components/templateParts/Spinners';
import PageTitle from "../components/common/PageTitle";
import StatusOfProperty from "../components/PropertyRequestForm/StatusOfProperty";
import SpecificsOfProperty from "../components/PropertyRequestForm/SpecificsOfProperty";
import ExteriorFeatures from "../components/PropertyRequestForm/ExteriorFeatures";
import LotDescription from "../components/PropertyRequestForm/LotDescription";
import PropertySuffers from "../components/PropertyRequestForm/PropertySuffers";
import DescriptionInteriorProblems from "../components/PropertyRequestForm/DescriptionInteriorProblems";
import DescriptionExteriorProblems from "../components/PropertyRequestForm/DescriptionExteriorProblems";
import ConditionOfHome from "../components/PropertyRequestForm/ConditionOfHome";
import PersonalDetails from "../components/PropertyRequestForm/PersonalDetails";
import PropertyDetails from "../components/PropertyRequestForm/PropertyDetails";
import { CustomerContext } from "../contexts/PDProvider";

import {
    Alert,
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    ListGroup,
    ListGroupItem,
    Container,
    Row,
    Col,
    Form,
} from "shards-react";

export default class PropertyRequestForm extends Component {

    static contextType = CustomerContext;

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            customerId: '',
            jwt: '',
            accountNumber: '',
            properties: [],
            alertVisible: false,
            alertMessage: '',
            alertType: 'success',
            isSubmitting: false,
            propertytaxAcc: '',
            propertyaddress: '',
            propertytype: '',
            recentPurchasedCost: '',
            currentListedSaleCost: '',
            recentListedCost: '',
            rentalProperty: '',
            obtainedPermits: '',
            subtiantialImprovements: '',
            yourOpinionOfValue: '',
            totalLivingAreaSqFt: '',
            lotAreaSqFt: '',
            bathroomsFull: '',
            bathroomsHalf: '',
            bedrooms: '',
            numStoreis: '',
            numFirePlaces: '',
            FirePlaces: '',
            basementType: '',
            basementAreaSqFt: '',
            garageType: '',
            numcars: '',
            foundationType: '',
            typeOfRoof: '',
            woodframeExterior: '',
            brickExterior: '',
            stoneExterior: '',
            stuccoExterior: '',
            guestquaters: '',
            outdoorkitchen: '',
            stableBan: '',
            storageBuilding: '',
            tennisCourt: '',
            boatDock: '',
            boatDockWLift: '',
            deck: '',
            Elevator: '',
            Pool: '',
            Spa: '',
            septicTank: '',
            Workshop: '',
            otherExteriorFeatures: '',
            gatedCommunity: '',
            creek: '',
            Lake: '',
            pond: '',
            parkView: '',
            largeLot: '',
            irregularSize: '',
            Corner: '',
            greenBelt: '',
            describeLot: '',
            interiorFoundationIssues: '',
            exteriorFoundationIssues: '',
            electricalIssues: '',
            plumbingIssues: '',
            defectiveRoof: '',
            subjectToFlooding: '',
            backsToCommercialProperty: '',
            petOdors: '',
            smokeOdors: '',
            cracksInSheetrocks: '',
            wallsNeedPaint: '',
            CarpetNeedReplace: '',
            woodFloorRefinishing: '',
            TileColorOutdated: '',
            DoorsNeedRepair: '',
            CabinetNeedRepair: '',
            windowNeedRepair: '',
            windowNeedReplacement: '',
            chimneyNeedCleaning: '',
            golf: '',
            electricalWiringProblems: '',
            plumbingNeedsRepair: '',
            bathrooms: '',
            kitchen: '',
            faucets: '',
            counterTopsNeedReplaced: '',
            showerTub: '',
            LightFixturesNeedReplaced: '',
            ApplicancesNeedRepairReplaced: '',
            Toilets: '',
            MirroNeedReplaced: '',
            landscapingIsDead: '',
            landscapingIsBelowTypical: '',
            ExteriorNeedPaint: '',
            exteriorWoodNeedsRepair: '',
            roofNeedsPaint: '',
            roofNeedsReplacement: '',
            minorFoundationSettling: '',
            majorFoundationSettling: '',
            drivewayMinorCracks: '',
            drivewayMajorCracks: '',
            fenceNeedsRepair: '',
            fenceNeedsReplacement: '',
            frontDoorNeedsRepair: '',
            frontDoorNeedsReplacement: '',
            poolNeedsNewEquipment: '',
            poolNeedsResurfaced: '',
            shuttersNeedRepairReplacement: '',
            guttersNeedRepairReplacement: '',
            sprinklerSystemNeedRepair: '',
            garageDoorNeedRepair: '',
            garageDoorOpenersNeedRepair: '',
            condition: null,
            commentsConditionsHome: '',
            reasonsValueLowered: '',
            firstname: '',
            lastname: '',
            baseUrl: process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_SERVER_SANDBOX_URL : process.env.REACT_APP_SERVER_PRODUCTION_URL,
            email: '',
        }
    }

    componentDidMount() {
        const appCredentials = JSON.parse(localStorage.getItem("appState"));
        if (appCredentials) {
            const customerId = appCredentials.customerId;
            const jwt = appCredentials.jwt;

            const properties = this.context.properties.length > 0 ? this.context.properties : appCredentials.properties;

            const { Account_Num } = properties[0];

            if (Object.keys(this.context.customer).length > 0) {
                const { first_name, last_name, email } = this.context.customer;
                this.setState({
                    firstname: first_name,
                    lastname: last_name, 
                    email,
                });
            }
            
            this.setState({
                customerId,
                jwt,
                accountNumber: Account_Num,
                properties,
            });
        }
    }

    submitRequestForm = event => {
        event.preventDefault();

        let formData = {...this.state};

        // Set Form Submission In Progress
        this.setState({ isSubmitting: true });

        // Make A Post Request
        axios.post(`${this.state.baseUrl}/survey/insertSurvey.php`, formData)
        .then(response => {
            if (response.data.code === "success") {
                this.setState({
                    alertVisible: true,
                    alertMessage: response.data.message,
                    alertType: 'success',
                    isSubmitting: false,
                });
            } else {
                this.setState({
                    alertVisible: true,
                    alertMessage: response.data.message,
                    alertType: 'danger',
                    isSubmitting: false,
                });
            }
        })
        .catch(error => console.log(error))
    }

    dismissAlert = () => this.setState({ alertVisible: false })

    onInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onRadioChange = (condition) => {
        this.setState({ condition })
    }

    incrementStep = event => {
        event.preventDefault();
        if (this.state.page < 10) {
            this.setState(state => ({
                page: state.page + 1
            }))
        }
    }

    decrementStep = event => {
        event.preventDefault();
        if (this.state.page > 1) {
            this.setState(state => ({
                page: state.page - 1
            }))
        }
    }

    render() {
        const { title } = this.props;

        return (
            <Container fluid className="main-content-container px-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
                </Row>
                <Col lg="12">
                    <Card small className="mb-4">
                        <CardHeader className="border-bottom">
                            <h6 className="mb-4">{title}</h6>
                            <Alert theme="info">
                                This form <strong>IS NOT REQUIRED</strong> to appeal your property value. Any answers you can provide can help to enhance our knowledge of your property, which may help in our appeal process. If you do not know the answer to a question, or it does not apply, leave it blank.
                            </Alert>
                        </CardHeader>
                        <ListGroup flush>
                            <ListGroupItem className="p-3">
                                <Form onSubmit={this.submitRequestForm}>
                                    {this.state.page === 1 && (
                                        <PropertyDetails 
                                            values={this.state}
                                            onInputChange={this.onInputChange} />
                                    )}
                                    {this.state.page === 2 && (
                                        <StatusOfProperty 
                                            values={this.state}
                                            onInputChange={this.onInputChange} 
                                        />
                                    )}
                                    {this.state.page === 3 && (
                                        <SpecificsOfProperty 
                                            values={this.state}
                                            onInputChange={this.onInputChange} 
                                        />
                                    )}
                                    {this.state.page === 4 && (
                                        <ExteriorFeatures 
                                            values={this.state}
                                            onInputChange={this.onInputChange} 
                                        />
                                    )}
                                    {this.state.page === 5 && (
                                        <LotDescription 
                                            values={this.state}
                                            onInputChange={this.onInputChange} 
                                        />
                                    )}
                                    {this.state.page === 6 && (
                                        <PropertySuffers 
                                            values={this.state}
                                            onInputChange={this.onInputChange} 
                                        />
                                    )}
                                    {this.state.page === 7 && (
                                        <DescriptionInteriorProblems 
                                            values={this.state}
                                            onInputChange={this.onInputChange} 
                                        />
                                    )}
                                    {this.state.page === 8 && (
                                        <DescriptionExteriorProblems 
                                            values={this.state}
                                            onInputChange={this.onInputChange} 
                                        />
                                    )}
                                    {this.state.page === 9 && (
                                        <ConditionOfHome 
                                            values={this.state}
                                            onInputChange={this.onInputChange} 
                                            onRadioChange={this.onRadioChange}
                                        />
                                    )}
                                    {this.state.page === 10 && (
                                        <PersonalDetails 
                                            values={this.state}
                                            onInputChange={this.onInputChange} 
                                        />
                                    )}

                                    <div className="d-flex justify-content-between">
                                        <Button 
                                            disabled={this.state.page !== 10}
                                            onClick={this.submitRequestForm}
                                        >
                                            {this.state.isSubmitting ? (<Fragment><Spinners /> Please Wait...</Fragment>) : 'Submit Form'}
                                        </Button>
                                        
                                        <ButtonGroup>
                                            <Button
                                                onClick={this.decrementStep}
                                            >Previous</Button>
                                            <Button outline disabled>
                                                Step {this.state.page} of 10
                                            </Button>
                                            <Button
                                                onClick={this.incrementStep}
                                            >Next</Button>
                                        </ButtonGroup>

                                    </div>
                                </Form>
                            </ListGroupItem>
                        </ListGroup>
                        <Alert 
                            dismissible={this.dismissAlert} 
                            open={this.state.alertVisible} 
                            theme={this.state.alertType}
                            className="mt-3"
                        >
                            { this.state.alertMessage }
                        </Alert>
                    </Card>
                </Col>
            </Container>
        )
    }
}

PropertyRequestForm.propTypes = {
    /**
     * The component's title.
     */
    title: PropTypes.string
};
  
PropertyRequestForm.defaultProps = {
    title: "Property Information Request Form"
};