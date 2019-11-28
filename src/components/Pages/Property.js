import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';
import queryString from 'query-string';
import axios from 'axios';
import { CustomerContext } from '../../contexts/PDProvider';
import Badge from 'react-bootstrap/Badge';
import RedirectionModal from "../templateParts/modals/RedirectionModal";
import Spinners from '../templateParts/Spinners';
import PropertyStatistics from '../templateParts/PropertyStatistics';


class Property extends Component {
    constructor(props) {
        super(props);
        this.state = {
            propertyAbsent: false,
            propertyDetails: {},
            baseUrl: process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_SERVER_SANDBOX_URL : process.env.REACT_APP_SERVER_PRODUCTION_URL,
        }
    }

    componentDidMount() {
        // First Check If The Account Number is in the address
        let parsedQuerySting = queryString.parse(this.props.location.search);
        let accountNumber = parsedQuerySting.accountNumber;
        // If there, pull the records from database
        if (accountNumber && accountNumber !== "") {
            // Make An API call to the server
            axios.post(`${this.state.baseUrl}/getaddresses/fetchaddress.php`, {
                propertyAddress: accountNumber,
                searchType: 'accountNumber',
            })
            .then(response => {
                if (response.data.code === undefined) {
                    if (response.data.properties.length > 0) {
                        // And Overwrite the localstorage
                        console.log(response.data.properties[0]);
                        this.setLocalStorage(response.data.properties[0]);
                        // Check Local Storage
                        this.checkLocalStorage();
                    } else {
                        // Check If We Have The Searched Property In Local Storage
                        // If Not there show modal to search for property
                        this.setState({propertyAbsent: true});
                    }
                }
            })
        } else {
            // Check Local Storage
            this.checkLocalStorage();
        }
        
    }

    checkLocalStorage = () => {
        // check localstorage
        const propertyPresent = localStorage.getItem("chosenProperty");
    
        // If not in localStorage, show a modal for the user to go to homepage
        if (!propertyPresent) {
            // Check If We Have The Searched Property In Local Storage
            // If Not there show modal to search for property
            this.setState({propertyAbsent: true})
        } else {
            const chosenProperty = JSON.parse(propertyPresent);
            if (chosenProperty.Account_Num && chosenProperty.Account_Num !== "" &&
                chosenProperty.Owner_Name && chosenProperty.Owner_Name !== "" && 
                chosenProperty.Situs_Address && chosenProperty.Situs_Address !== ""
                ) {

                    const accountNumber = chosenProperty.Account_Num;
                    const ownerName = chosenProperty.Owner_Name;
                    const situsAddress = chosenProperty.Situs_Address;
                    this.setState({
                        propertyDetails: {accountNumber, ownerName, situsAddress}
                    });
            } else {
                this.setState({propertyAbsent: true})
            }
        }
    }

    setLocalStorage = (property) => {
        
        // Remove it from context if present
        if (localStorage.getItem('chosenProperty')) {
            localStorage.removeItem('chosenProperty');
        }
        // Add the property to localstorage
        localStorage.setItem('chosenProperty', JSON.stringify(property));
    }

    render() {
        const { styles } = this.context;
        const propertyAvailable = Object.keys(this.state.propertyDetails).length > 0;
        return (
            <Fragment>
                <section 
                    id={styles.home} 
                    className={styles.videoHero} 
                    style={{
                        height: '700px', 
                        backgroundImage: `url(${require('../../assets/images/cover_img_1.jpg')})`,
                        backgroundSize:'cover', 
                        backgroundPosition: 'center center',
                        backgroundAttachment:'fixed'
                    }} 
                    data-section="home"
                >
                    <div className={styles.overlay}></div> 
                    <div className={`${styles.displayT} text-center`}>
                        <div className={styles.displayTc}>
                            <div className="container">
                                <div className="col-md-12 col-md-offset-0">
                                    <div className={styles.animateBox}>
                                        <ScrollAnimation animateIn="fadeInUp">
                                        <h2>Property Details For </h2>
                                        {propertyAvailable && (
                                            <Fragment>
                                                <p>{this.state.propertyDetails.situsAddress}</p>
                                                <p style={{ fontSize: '16px' }}>
                                                    County Account Number: <strong>{this.state.propertyDetails.accountNumber}</strong>  •  
                                                    Owner Name: <strong>{this.state.propertyDetails.ownerName}</strong>  •  
                                                    Street Address: <strong>{this.state.propertyDetails.situsAddress}</strong>
                                                </p>
                                                <p>
                                                <Link 
                                                    to="/checkout" 
                                                    className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg} btn btn-primary btn-lg ${styles.btnCustom}`}
                                                >
                                                    Get Started Now
                                                </Link>
                                            </p>
                                            </Fragment>
                                        )}
                                        {!propertyAvailable && (
                                            <p>
                                                <button
                                                    type="button" 
                                                    disabled
                                                    className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg} btn btn-primary btn-lg ${styles.btnCustom}`}
                                                >
                                                    Fetching Property... <Spinners />
                                                </button>
                                            </p>
                                        )}
                                        </ScrollAnimation>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <PropertyStatistics 
                    styles={styles} 
                    property={this.state.propertyDetails} 
                />

                <div 
                    id={styles.colorlibSubscribe} 
                    className={styles.colorlibSubscribe} 
                    style={{backgroundImage: `url(${require('../../assets/images/cover_img_1.jpg')})`}}
                >
                    <div className={styles.overlay}></div>
                    <div className="container">
                        <ScrollAnimation animateIn="fadeInUp">
                        <div className="row">
                            <div className={`col-md-12 text-center ${styles.colorlibHeading} ${styles.animateBox}`}>
                                <h2>Don’t give up your right to protest your property value.</h2>
                                <p>We were successful in getting the value reduced on 93% of the properties we represented.</p>
                            </div>
                        </div>
                        <div className={`row ${styles.animateBox}`}>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                    {!propertyAvailable ? 
                                        (
                                            <p>
                                                <button
                                                    type="button" 
                                                    disabled
                                                    className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg} btn btn-primary btn-lg ${styles.btnCustom}`}
                                                >
                                                    Fetching Property... <Spinners />
                                                </button>
                                            </p>
                                        ) : 
                                        (
                                            <p>
                                                <Link to="/checkout" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg} btn btn-primary btn-lg ${styles.btnCustom}`}>
                                                    Get Started
                                                </Link>
                                            </p>
                                        )
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                        </ScrollAnimation>
                    </div>
                </div>

                <div className={styles.colorlibIntro} style={{backgroundColor: '#fff'}}>
                    <div className="container">
                        <ScrollAnimation animateIn="fadeInUp">
                        <div className="row">
                            
                            <div className={`col-md-12 text-center ${styles.colorlibHeading} ${styles.animateBox}`}>
                                <h2>Are you utilizing the Homestead Exemption and/or Over 65 Exemption?</h2>
                                <p>
                                    Many homeowners are not taking advantage of 
                                    these tax benefits. If you qualify for one or both, 
                                    it could save you thousands. If you need to file 
                                    for either exemption, use our service to fill out 
                                    most of the information you need to provide to the 
                                    appraisal district.
                                </p>
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className={`col-md-12 text-center ${styles.animateBox}`}>
                                <p><Link to="/" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg} btn btn-primary btn-lg ${styles.btnCustom}`}>Print Exception Form</Link></p>
                            </div>
                        </div>
                        </ScrollAnimation>
                    </div>
                </div>

                <div className={`${styles.colorlibWork} pb-0`}>
                    <div className="container">
                        <div className="row">
                            <ScrollAnimation animateIn="fadeInUp">
                            <div className="col-md-12">
                                <div className={styles.workFlex}>
                                    <div className={`${styles.half} ${styles.animateBox}`}>
                                        <div className={`row ${styles.noGutters}`} style={{ height: '100%' }}>
                                            <div className={`col-md-12 col-md-pull-12 ${styles.noGutters}`}>
                                                <div className={`${styles.displayT} ${styles.desc}`}>
                                                    <div className={styles.displayTc}>
                                                        <h2><Link to="/">Already protested this year?</Link></h2>
                                                        <p>
                                                            If you filed a protest before or 
                                                            after signing up with Property Tax Lock, 
                                                            <Link to="/">find out how to withdraw your protest.</Link>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.half} ${styles.animateBox}`}>
                                        <div className={`row ${styles.noGutters}`}>
                                            <div className={`col-md-12 col-md-push-12 ${styles.noGutters}`}>
                                                <div 
                                                    className={`${styles.displayT} ${styles.desc}`}
                                                    style={{
                                                        backgroundColor: '#6e8de4',
                                                        height: '450px'
                                                    }}
                                                >
                                                    <div className={styles.displayTc} style={{ color: '#fff' }}>
                                                        <h2 style={{ color: '#fff' }}>Do you own other properties? We can help with those too.</h2>
                                                        <p>
                                                            According to our records, you may own at least 24 additional properties.
                                                        </p>
                                                        <p>
                                                            If you would like Property Tax Lock to
                                                             protest taxes on additional properties, 
                                                             please complete the checkout process 
                                                             separately for each property.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </ScrollAnimation>
                        </div>
                    </div>
                </div>

                <div className={styles.colorlibPricing}>
                    <div className="container">
                        <ScrollAnimation animateIn="fadeInUp">
                        <div className="row">
                            
                            <div className={`col-md-12 text-center ${styles.colorlibHeading} ${styles.animateBox}`}>
                                <h2>4 Steps to Paying Less Property Tax</h2>
                            </div>
                            
                        </div>
                        </ScrollAnimation>
                        <div className="row">
                            <div className={`col-md-3 text-center ${styles.animateBox}}`}>
                                <ScrollAnimation animateIn="fadeInUp">
                                <div className={styles.pricing}>
                                    <h2 className={styles.pricingHeading}>Get your Report</h2>
                                    <div className={styles.price}>
                                        <i className="icon-piechart"></i>
                                    </div>
                                    <p>
                                        Great job! The first step is done. 
                                        Just a few steps away from saving money on 
                                        your property taxes.
                                    </p>
                                    <p><Badge variant="success">Achieved</Badge></p>
                                </div>
                                </ScrollAnimation>
                            </div>
                            <div className="col-md-3 text-center animate-box">
                                <ScrollAnimation animateIn="fadeInUp" delay={500}>
                                <div className={styles.pricing}>
                                    <h2 className={styles.pricingHeading}>Make Payment</h2>
                                    <div className={styles.price}>
                                        <i className="icon-coin-dollar"></i>
                                    </div>
                                    <p>
                                        It couldn’t be easier!  
                                        <Link to="/checkout">Get Started Now</Link> and 
                                        enter your info on our secure payment form.
                                    </p>
                                    <p><Badge variant="secondary"> Next up...</Badge></p>
                                </div>
                                </ScrollAnimation>
                            </div>
                            <div className="col-md-3 text-center animate-box">
                                <ScrollAnimation animateIn="fadeInUp" delay={1000}>
                                <div className={styles.pricing}>
                                    <h2 className={styles.pricingHeading}>Sign the Papers</h2>
                                    <div className={styles.price}>
                                        <i className="icon-edit"></i>
                                    </div>
                                    <p>
                                        Sign a legal document with your mouse
                                         to give us authority to protest your property taxes.
                                    </p>
                                    <p><Badge variant="secondary"> Dot the i's, etc..</Badge></p>
                                </div>
                                </ScrollAnimation>
                            </div>
                            <div className="col-md-3 text-center animate-box">
                                <ScrollAnimation animateIn="fadeInUp" delay={1500}>
                                <div className={styles.pricing}>
                                    <h2 className={styles.pricingHeading}>We’ll Be In Touch</h2>
                                    <div className={styles.price}>
                                        <i className="icon-chat"></i>
                                    </div>
                                    
                                    <p>
                                        We’ll keep you posted by email and/or 
                                        phone as we work through the protest process.
                                    </p>
                                    <p><Badge variant="secondary">Sip a beverage.</Badge></p>
                                </div>
                                </ScrollAnimation>
                            </div>
                        </div>
                    </div>
                </div>

                <div 
                    id={styles.colorlibSubscribe} 
                    className={styles.colorlibSubscribe} 
                    style={{backgroundImage: `url(${require('../../assets/images/cover_img_1.jpg')})`}}
                >
                    <div className={styles.overlay}></div>
                    <div className="container">
                        <ScrollAnimation animateIn="fadeInUp">
                        <div className="row">
                            <div className={`col-md-12 text-center ${styles.colorlibHeading} ${styles.animateBox}`}>
                                <h2>Property Tax Lock's suggested action:</h2>
                            </div>
                        </div>
                        <div className={`row ${styles.animateBox}`}>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        {!propertyAvailable ? 
                                            (
                                                <p>
                                                    <button
                                                        type="button" 
                                                        disabled
                                                        className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg} btn btn-primary btn-lg ${styles.btnCustom}`}
                                                    >
                                                        Fetching Property... <Spinners />
                                                    </button>
                                                </p>
                                            ) : 
                                            (
                                                <p>
                                                    <Link to="/checkout" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg} btn btn-primary btn-lg ${styles.btnCustom}`}>
                                                        Have Property Tax Lock Protest Your Property Tax
                                                    </Link>
                                                </p>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        </ScrollAnimation>
                    </div>
                </div>
                {this.state.propertyAbsent && 
                    <RedirectionModal 
                        showModal={this.state.propertyAbsent} 
                        modalTitle={'No Property Selected'}
                        modalBody={'You Have Not Yet Searched For Your Property'}
                        modalDestination="/"
                        modalActionText={'Go Back To Homepage'}
                    />
                }
            </Fragment>
        );
    }
}

Property.contextType = CustomerContext;

export default Property;