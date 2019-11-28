import React, { Fragment } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {CustomerContext} from "../contexts/PDProvider";
import Spinners from '../components/templateParts/Spinners';
import {
    Alert,
    Card,
    CardHeader,
    ListGroup,
    ListGroupItem,
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    FormInput,
    FormSelect,
    FormTextarea,
    Button,
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Progress from "../components/components-overview/ProgressBars";

class DocumentUpload extends React.Component {
    static contextType = CustomerContext;

    constructor(props) {
        super(props);
        this.state = {
            baseUrl: process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_SERVER_SANDBOX_URL : process.env.REACT_APP_SERVER_PRODUCTION_URL,
            userId: '',
            jwt: '',
            title: '',
            description: '',
            percentageUploaded: 0,
            fileName: 'Choose File To Upload...',
            file: {},
            alertVisible: false,
            alertMessage: '',
            alertType: 'success',
            properties: [],
            isSubmitting: false,
            accountNumber: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFileInputChange = this.handleFileInputChange.bind(this);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    componentDidMount() {
        const appCredentials = JSON.parse(localStorage.getItem("appState"));
        if (appCredentials) {
            const customerId = appCredentials.customerId;
            const jwt = appCredentials.jwt;

            const properties = this.context.properties.length > 0 ? 
            this.context.properties : appCredentials.properties;
    
            let accountNumber = properties[0]["Account_Num"];
            
            this.setState({
                userId: customerId,
                jwt,
                accountNumber,
                properties,
            })
        }
    }

    handleFileInputChange(event) {

        this.setState({
            file: event.target.files[0],
            fileName: event.target.files[0].name,
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    async handleFormSubmission(event) {
        event.preventDefault();
        // First Check That The User Choosed A File
        // console.log(this.state.file.name);
        if (this.state.file.name !== undefined) {
            try {
                this.setState({ isSubmitting: true });
                let response = await this.uploadFile(this.state.file);
                if (response.data.code === undefined) {
                    // Push The New Upload Response Into the Contexts Documents
                    this.context.setSingleDocument(response.data.document);
                    this.setState({
                        alertMessage: response.data.message,
                        alertVisible: true,
                        alertType: 'success',
                        isSubmitting: false
                    });
                } else {
                    this.setState({
                        alertMessage: response.data.message,
                        alertVisible: true,
                        alertType: 'danger',
                        isSubmitting: false
                    });
                }
            } catch(err) {
                this.setState({
                    alertMessage: err.message,
                    alertVisible: true,
                    alertType: 'danger',
                    isSubmitting: false
                });
            }
        }
    }

    clearForm() {
        this.setState({
            alertMessage: '',
            alertVisible: false,
            percentageUploaded: 0,
            fileName: 'Choose File To Upload...',
            title: '',
            description: '',
            isSubmitting: false
        })
    }

    async uploadFile(file){
        const formData = new FormData();
        
        formData.append('file',file);
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('customerId', this.state.userId);
        formData.append('jwt', this.state.jwt);
        formData.append('accountNumber', this.state.accountNumber);
        
        return  await axios.post(`${this.state.baseUrl}/fileupload/upload.php`, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            },
            onUploadProgress: (ProgressEvent) => {
                let percentage = parseInt(Math.round(ProgressEvent.loaded * 100) / ProgressEvent.total);
                this.setState({
                    percentageUploaded: percentage
                });
                
                setTimeout(() => this.clearForm(), 10000);
            }
        });
    }

    dismissAlert() {
        this.clearForm();
    }

    render() {
        return(
            <Container fluid className="main-content-container px-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle title="Upload Documents" subtitle="Documents" md="12" className="ml-sm-auto mr-sm-auto" />
                </Row>
                <Row>
                    <Col lg="12">
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">{this.props.title}</h6>
                            </CardHeader>
                            <ListGroup flush>
                                <ListGroupItem className="p-3">
                                    <Row>
                                        <Col>
                                            <Form onSubmit={this.handleFormSubmission}>
                                                <FormGroup>
                                                    <label htmlFor="feAddress">Title</label>
                                                    <FormInput
                                                        id="feAddress"
                                                        placeholder="Documents Title"
                                                        value={this.state.title}
                                                        type="text"
                                                        name="title"
                                                        onChange={this.handleInputChange}
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <label htmlFor="property">Choose Property</label>
                                                    <FormSelect 
                                                        id="property" 
                                                        name="accountNumber"
                                                        onChange={this.handleInputChange}
                                                        value={this.state.accountNumber}
                                                    >
                                                        {
                                                            this.state.properties.map((property, index) => (
                                                                <option 
                                                                    value={property.Account_Num}
                                                                    key={index}
                                                                >
                                                                    {`${property.Situs_Address}, ${property.Owner_CityState}`}
                                                                </option>
                                                            ))
                                                        }
                                                    </FormSelect>
                                                </FormGroup>
                                                <FormGroup>
                                                    <strong className="text-muted d-block mb-2">Choose Files</strong>
                                                    <div className="custom-file">
                                                        <input 
                                                            type="file" 
                                                            className="custom-file-input" 
                                                            id="customFile2" 
                                                            onChange={this.handleFileInputChange}
                                                        />
                                                        <label className="custom-file-label" htmlFor="customFile2">
                                                            {this.state.fileName}
                                                        </label>
                                                    </div>
                                                </FormGroup>
                                                <Progress percentage={this.state.percentageUploaded} />
                                                <FormGroup>
                                                    <strong className="text-muted d-block mb-2">Describe Your Documents</strong>
                                                    <FormTextarea 
                                                        name="description"
                                                        value={this.state.description}
                                                        onChange={this.handleInputChange} />
                                                </FormGroup>
                                                <Button 
                                                    theme="primary" 
                                                    type="submit"
                                                    disabled={this.state.isSubmitting}
                                                >
                                                    {this.state.isSubmitting ? (<Fragment><Spinners /> Please Wait...</Fragment>) : 'Upload'}
                                                </Button>
                                            </Form>
                                            <Alert 
                                                dismissible={this.dismissAlert} 
                                                open={this.state.alertVisible} 
                                                theme={this.state.alertType}
                                                className="mt-3"
                                            >
                                                { this.state.alertMessage }
                                            </Alert>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

DocumentUpload.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

DocumentUpload.defaultProps = {
  title: "Documents Upload"
};

export default DocumentUpload;
