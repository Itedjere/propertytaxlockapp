import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import PlacesAutocomplete from 'react-places-autocomplete';
import axios from "axios";
import ScrollAnimation from 'react-animate-on-scroll';
import SearchButtons from './SearchButtons';
import NotificationModal from "../../modals/NotificationModal";
import Spinners from '../../Spinners';
import { CustomerContext } from '../../../../contexts/PDProvider';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import '../../../../assets/css/autocomplete.css';

class HomePageSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            address: '',
            ownerName: '',
            accountNumber: '',
            showModal: false,
            propertyFound: false,
            properties: [],
            searchingProperties: false,
            searchType: 'address',
            goToCheckOut: false,
            // baseUrl: process.env.REACT_APP_SERVER_SANDBOX_URL,
            googleScriptLoaded: false,
            baseUrl: process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_SERVER_SANDBOX_URL : process.env.REACT_APP_SERVER_PRODUCTION_URL,
        };
    }

    handleSeachType = (searchType) => {
        this.setState({ searchType })
    }

    handleSearchChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    closeModal = () => {
        this.setState({
            showModal: false,
            propertyFound: false,
            properties: [],
        })
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        let propertyAddress = '';

        if (this.state.searchType === "address") {
            // First Check For the occurence of a commer ','
            let commaPosition = address.indexOf(',');
            if (commaPosition === -1) {
                propertyAddress = address;
            } else {
                propertyAddress = address.slice(0, commaPosition);
            }
        } else if (this.state.searchType === "accountNumber") {
            propertyAddress = this.state.accountNumber;
        } else if (this.state.searchType === "ownerName") {
            propertyAddress = this.state.ownerName;
        }

        // If Property Address is not empty
        if (propertyAddress !== "") {
            // First Show Loading Modal
            this.setState({
                showModal: true,
                searchingProperties: true,
            })
            // console.log(propertyAddress);
            // Make An API call to the server
            axios.post(`${this.state.baseUrl}/getaddresses/fetchaddress.php`, {
                propertyAddress,
                searchType: this.state.searchType,
            })
            .then(response => {
                // console.log(response.data);
                // populate the state
                if (response.data.code === undefined) {
                    // console.log(response.data);
                    if (response.data.properties.length > 0) {
                        //  Result Found
                        this.setState({
                            searchingProperties: false,
                            propertyFound: true,
                            properties: response.data.properties,
                        })

                    } else {
                        // Empty Result
                        this.setState({
                            searchingProperties: false,
                            propertyFound: false,
                            properties: [],
                        })
                    }
                } else {
                    // show an modal box
                    let errorPayload = { 
                        code: response.data.code, 
                        message: response.data.message
                    };
                    console.log(errorPayload);
                    // Server Error
                    this.setState({
                        searchingProperties: false,
                        propertyFound: false,
                        properties: [],
                    })
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
        // geocodeByAddress(address)
        //   .then(results => getLatLng(results[0]))
        //   .then(latLng => console.log('Success', latLng))
        //   .catch(error => console.error('Error', error));
    };

    handleError = (status, clearSuggestions) => {
        console.log('Google Maps API returned error with status: ', status);
        clearSuggestions();
    }

    propertySelected = (property) => {
        
        // Remove it from context if present
        if (localStorage.getItem('chosenProperty')) {
            localStorage.removeItem('chosenProperty');
        }
        // Add the property to localstorage
        localStorage.setItem('chosenProperty', JSON.stringify(property));

        // SetState To Redirect To Checkout
        this.setState({goToCheckOut: true});
    }

    UNSAFE_componentWillMount(){
        if (document.getElementById("googleScript") === null) {
            const that = this;
            let googleScript = document.createElement('script');
            googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}&libraries=places`;
            googleScript.type = "text/javascript";
            googleScript.id="googleScript";
            googleScript.onload = ()=>{that.setState({
                googleScriptLoaded: true
            })};
            document.getElementsByTagName("head")[0].appendChild(googleScript);
        } else {
            this.setState({ googleScriptLoaded: true });
        }
    }

    render() {
        const { styles } = this.context;

        return (
            <section  
                id={styles.home} 
                className={styles.videoHero} 
                style={{
                    height: '700px',
                    backgroundImage: `url(${require('../../../../assets/images/cover_img_1.jpg')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundAttachment: 'fixed '
                }} 
                data-section="home"
            >
                {this.state.goToCheckOut && <Redirect to='/propertyreport' />}
                <div className={styles.overlay}></div>
                <div className={`${styles.displayT} text-center`}>
                    <div className={styles.displayTc}>
                        <ScrollAnimation animateIn="fadeInUp">
                            <Container>
                                <Row>
                                    <Col md={{ span: 10, offset: 1 }}>
                                        <div className={styles.animateBox}>
                                            <h2 style={{paddingBottom: '15px'}}>Free Yourself From Rising Property Taxes</h2>
                                            <p>Find Your Property, Choose Your Property, View Your Property</p>
                                            
                                        </div>
                                    </Col>
                                    <Col md={{ span: 8, offset: 2 }}>
                                        {/* Put The Tree Buttons Here */}
                                        <div className="d-flex flex-column mb-5">
                                            <SearchButtons 
                                                handleSeachType={this.handleSeachType} 
                                                searchType={this.state.searchType}
                                            />
                                        </div>
                                        {(this.state.googleScriptLoaded && this.state.searchType === "address") && (
                                            <PlacesAutocomplete
                                                value={this.state.address}
                                                onChange={this.handleChange}
                                                onSelect={this.handleSelect}
                                                onError={this.handleError}
                                                searchOptions={this.state.searchOptions}
                                            >
                                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                    <Fragment>
                                                        <div className={styles.animateBox} style={{ position: 'relative' }}>
                                                            <Form 
                                                                className={`form-inline ${styles.qbstpHeaderSubscribe}`}
                                                                onSubmit={event => event.preventDefault()}>
                                                                <div className={styles.colThreeForth}>
                                                                    <Form.Group className={`${styles.formGroup}`}>
                                                                        <Form.Control 
                                                                            {...getInputProps({
                                                                                placeholder: 'Search By Address Of Property ...',
                                                                                className: `${styles.name} form-control ${styles.formControl}`,
                                                                                type: 'text',
                                                                            })}
                                                                        />
                                                                    </Form.Group>
                                                                </div>
                                                                <div className={styles.colSixSeventh}>
                                                                    <Form.Group className={`${styles.formGroup}`}>
                                                                        <Button 
                                                                            variant="primary" 
                                                                            type="submit"
                                                                            className={`${styles.btn} ${styles.btnPrimary}`}
                                                                            onClick={() => this.handleSelect(this.state.address)}
                                                                        >
                                                                            <i className="icon-search3"></i> Search
                                                                        </Button>
                                                                    </Form.Group>
                                                                </div>
                                                            </Form>
                                                            <div className="autocomplete-dropdown-container">
                                                                {loading && (<div style={{textAlign: 'center', width: '100%'}}><Spinners /></div>)}
                                                                {suggestions.map(suggestion => {
                                                                    const className = suggestion.active
                                                                    ? 'suggestion-item--active'
                                                                    : 'suggestion-item';
                                                                    // inline style for demonstration purpose
                                                                    // const style = suggestion.active
                                                                    // ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                                    // : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                                    return (
                                                                        <div
                                                                            {...getSuggestionItemProps(suggestion, {
                                                                            className,
                                                                            // style,
                                                                            })}
                                                                        >
                                                                            <span>{suggestion.description}</span>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </Fragment>
                                                )}
                                            </PlacesAutocomplete>
                                        )}
                                        {this.state.searchType === "accountNumber" && (
                                            <div className={styles.animateBox}>
                                                <Form 
                                                    onSubmit={event => event.preventDefault()} 
                                                    className={`form-inline ${styles.qbstpHeaderSubscribe}`}
                                                >
                                                    <div className={styles.colThreeForth}>
                                                        <Form.Group className={`${styles.formGroup}`}>
                                                            <Form.Control 
                                                                placeholder='Search By Account Number Of Property...'
                                                                className={`${styles.name} ${styles.formControl}`}
                                                                type='text'
                                                                name="accountNumber"
                                                                value={this.state.accountNumber}
                                                                onChange={this.handleSearchChange}
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                    <div className={styles.colSixSeventh}>
                                                        <Form.Group className={`${styles.formGroup}`}>
                                                            <Button 
                                                                variant="primary" 
                                                                type="submit"
                                                                className={`${styles.btn} ${styles.btnPrimary}`}
                                                                onClick={() => this.handleSelect(this.state.accountNumber)}
                                                            >
                                                                <i className="icon-search3"></i> Search
                                                            </Button>
                                                        </Form.Group>
                                                    </div>
                                                </Form>
                                            </div>
                                        )}
                                        {this.state.searchType === "ownerName" && (
                                            <div className={styles.animateBox}>
                                                <Form 
                                                    onSubmit={event => event.preventDefault()} 
                                                    className={`form-inline ${styles.qbstpHeaderSubscribe}`}
                                                >
                                                    <div className={styles.colThreeForth}>
                                                        <Form.Group className={`${styles.formGroup}`}>
                                                            <Form.Control 
                                                                placeholder='Search By Owner Name Of Property ...'
                                                                className={`${styles.name} ${styles.formControl}`}
                                                                type='text'
                                                                name="ownerName"
                                                                value={this.state.ownerName}
                                                                onChange={this.handleSearchChange}
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                    <div className={styles.colSixSeventh}>
                                                        <Form.Group className={`${styles.formGroup}`}>
                                                            <Button 
                                                                variant="primary" 
                                                                type="submit"
                                                                className={`${styles.btn} ${styles.btnPrimary}`}
                                                                onClick={() => this.handleSelect(this.state.ownerName)}
                                                            >
                                                                <i className="icon-search3"></i> Search
                                                            </Button>
                                                        </Form.Group>
                                                    </div>
                                                </Form>
                                            </div>
                                        )}
                                    </Col>
                                </Row>
                            </Container>
                        </ScrollAnimation>
                    </div>
                </div>
                <NotificationModal 
                    closeModal={this.closeModal} 
                    showModal={this.state.showModal} 
                    propertyFound={this.state.propertyFound}
                    properties={this.state.properties}
                    searchingProperties={this.state.searchingProperties}
                    propertySelected={this.propertySelected}
                />
            </section>
        );
    }
}

HomePageSearch.contextType = CustomerContext;

export default HomePageSearch;