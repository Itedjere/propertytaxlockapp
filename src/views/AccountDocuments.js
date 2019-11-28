import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import ImageGallery from 'react-image-gallery';
import { CustomerContext } from "../contexts/PDProvider";
import PageTitle from "../components/common/PageTitle";
import Table from 'react-bootstrap/Table';

import "react-image-gallery/styles/css/image-gallery.css";

import { 
    Alert,
    Badge,
    Button,
    Container, 
    Row, 
    Col, 
    Card, 
    CardHeader, 
    CardBody, 
    FormRadio,
    ListGroup, 
    FormCheckbox,
    ListGroupItem,
    Modal, 
    ModalBody, 
    ModalHeader,
} from "shards-react";

import Accordion from "react-bootstrap/Accordion";

class AccountDocuments extends Component {
    static contextType = CustomerContext;

    constructor(props) {
        super(props);

        this.properties = JSON.parse(localStorage.getItem("appState")).properties;

        this.accountNumber = this.properties[0]["Account_Num"]

        this.state = {
            accountNumber: this.accountNumber,
            properties: this.properties,
            propertiesGallery: [],
            showGallery: false,
            startGalleryAtPos: 0,
            allDocuments: [],
            documents: [],
            modalOpened: false,
            errorModalOpened: false,
            errorModalMsg: 'Sorry A Server Error Occured. Logout And Login Again If Error Persists',
            baseUrl: process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_SERVER_SANDBOX_URL : process.env.REACT_APP_SERVER_PRODUCTION_URL,
        }
    }

    componentDidMount() {
        // Pull All The Documents For This Account
        const appCredentials = JSON.parse(localStorage.getItem("appState"));
        if (appCredentials) {
            const customerId = appCredentials.customerId;
            const jwt = appCredentials.jwt;
            /* const properties = this.context.properties.length > 0 ? 
            this.context.properties : appCredentials.properties;
    
            let accountNumber = properties[0]["accountNumber"];
            // Set The Initial Property To Display
            this.setState({ accountNumber }); */

            if (this.context.documents.length > 0) {
                // We need to set the documents and the properties
                this.setInitialState(this.context.documents);
            } else {
                const formData = new FormData();
                formData.append("jwt", jwt);
                formData.append("customerId", customerId);

                axios.post(`${this.state.baseUrl}/fileupload/GetUpload.php`, formData)
                .then(response => {
                    if (response.data.code === undefined) {
                        console.log(response.data);
                        let allDocuments = response.data.documents;
                        // Add The Documents To Context
                        this.context.setDocuments(allDocuments);
                        this.setInitialState(allDocuments);
                    } else {
                        // show an modal box
                        let errorPayload = { 
                            code: response.data.code, 
                            message: response.data.message
                        };
                        console.log(errorPayload);
                        // JWT Error
                        this.setState({
                            errorModalOpened: true
                        })
                    }
                })
                .catch(error => {
                    console.log(error);
                }) 
            }
        }

    }

    setInitialState = (allDocuments) => {
        allDocuments = allDocuments.map(document => ({
            ...document,
            doc_loc: `${this.state.baseUrl}/fileupload/${document.doc_loc}`
        }));
        const documents = allDocuments.filter(document => document.doc_accountNumber === this.state.accountNumber);
        const propertiesGallery = this.setGallery(documents);
        this.setState({ documents, allDocuments, propertiesGallery });
    }

    changeProperty = (accountNumber) => {
        const documents = this.state.allDocuments.filter(document => document.doc_accountNumber === accountNumber);
        const propertiesGallery = this.setGallery(documents);
        this.setState({ accountNumber, documents, propertiesGallery });
    }

    setGallery = (documents) => {
        // Grab the images and pass them to the gallery
        const documentsWithGallery = documents.filter(document => document.doc_type.indexOf("image/") !== -1);
        return documentsWithGallery.map(document => ({
            original: `${document.doc_loc}`,
            thumbnail: `${document.doc_loc}`
        }));
    }

    toggleErrorModal = () => {
        this.setState({ errorModalOpened: false })
    }

    toggleGallery = (startGalleryAtPos) => {
        this.setState({ 
            showGallery: !this.state.showGallery, 
            startGalleryAtPos,
        })
    }

    render() {
        return (
            <Container fluid className="main-content-container px-4">
                {/* Page Header */}
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="View Documents" subtitle="Account" className="text-sm-left" />
                </Row>
                {/* Default Light Table */}
                <Row>
                    <Col>
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <h5 className="mb-3">Select Property To View Document</h5>
                                {
                                    this.state.documents.length > 0 && this.state.propertiesGallery.length > 0 ?
                                    (
                                        <FormCheckbox
                                            toggle
                                            checked={this.state.showGallery}
                                            onChange={() => this.toggleGallery(0)}
                                        >
                                                {this.state.showGallery ? "Hide Gallery" : "Show Gallery"}
                                        </FormCheckbox>
                                    ) : null
                                }
                                <fieldset>
                                    {
                                        !this.state.showGallery ? null : 
                                        (
                                            <ListGroup flush small>
                                                {
                                                    this.state.properties.map((property, index) => (
                                                        <ListGroupItem key={index}>
                                                            <FormRadio 
                                                                name="properties" 
                                                                checked={property.accountNumber === this.state.accountNumber}
                                                                onChange={() => this.changeProperty(property.accountNumber)}
                                                            >
                                                                {`${property.situsAddress}, ${property.cityState}`}
                                                            </FormRadio>
                                                        </ListGroupItem>
                                                    ))
                                                }
                                            </ListGroup>
                                        )
                                    }
                                </fieldset>
                            </CardHeader>
                            <CardBody className="p-0 pb-3">
                                {
                                    this.state.showGallery ? 
                                    (
                                        <ImageGallery 
                                            items={this.state.propertiesGallery} 
                                            showBullets
                                            showIndex
                                            slideOnThumbnailOver
                                            startIndex={this.state.startGalleryAtPos}
                                        /> 
                                    ) : 
                                    (
                                        
                                        this.state.documents.length < 1 ?
                                        (
                                            <Alert theme="primary">
                                                You Have Not Uploaded Any Documents -{" "}
                                                <Link className="btn btn-secondary" to="/upload-documents">
                                                    Upload Documents Today
                                                </Link>
                                            </Alert>
                                        ) :
                                        (
                                            <Accordion>
                                                <Table bordered hover responsive>
                                                    <thead className="bg-light">
                                                        <tr>
                                                        <th scope="col" className="border-0">
                                                            #
                                                        </th>
                                                        <th scope="col" className="border-0">
                                                            Title
                                                        </th>
                                                        <th scope="col" className="border-0">
                                                            Document Type
                                                        </th>
                                                        <th scope="col" className="border-0">
                                                            Description
                                                        </th>
                                                        <th scope="col" className="border-0">
                                                            Document
                                                        </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.documents.map((document, index) => (
                                                                <Fragment key={index}>
                                                                    <tr>
                                                                        <td>{index + 1}</td>
                                                                        <td>{document.doc_title === "" ? <Badge>No Title</Badge> : document.doc_title}</td>
                                                                        <td>
                                                                            {
                                                                                document.doc_type.indexOf('image/') !== -1 ? 
                                                                                <Badge theme="secondary">{document.doc_type}</Badge> : 
                                                                                <Badge theme="danger">{document.doc_type}</Badge>
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            <Accordion.Toggle 
                                                                                as={Button} 
                                                                                variant={document.doc_description !== "" ? "info" : "secondary"} 
                                                                                eventKey={index}
                                                                                disabled={document.doc_description === ""}
                                                                            >
                                                                                {document.doc_description !== "" ? "Take A Look" : "Not Given"}
                                                                            </Accordion.Toggle>
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                document.doc_type.indexOf('image/') !== -1 ? 
                                                                                (
                                                                                    <Button onClick={() => this.toggleGallery(index)}>Take A Look</Button>
                                                                                ) : 
                                                                                (
                                                                                    <a 
                                                                                        href={document.doc_loc} 
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        className="btn btn-primary"
                                                                                    >Take A Look</a>
                                                                                )
                                                                                
                                                                            }
                                                                            
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colSpan={5} style={{ padding: '0px' }}>
                                                                            <Accordion.Collapse eventKey={index}>
                                                                                <CardBody>{ document.doc_description }</CardBody>
                                                                            </Accordion.Collapse>
                                                                        </td>
                                                                    </tr>
                                                                </Fragment>
                                                            ))
                                                        }
                                                    </tbody>
                                                </Table>
                                            </Accordion>
                                        )
                                        
                                    )
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Modal centered open={this.state.errorModalOpened} toggle={this.toggleErrorModal}>
                    <ModalHeader>Error</ModalHeader>
                    <ModalBody>
                        <p>{this.state.errorModalMsg}</p>
                        <Link to="/logout" className="btn btn-primary">Logout</Link>
                    </ModalBody>
                </Modal>
            </Container>
        );
    }
}

export default AccountDocuments;