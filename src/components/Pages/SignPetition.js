import React, { Component, Fragment } from 'react';
import ReactPlayer from 'react-player';
import Banner from '../templateParts/Banner';
import { CustomerContext } from "../../contexts/PDProvider";
import HomePageDownload from '../templateParts/PageSections/Home/HomePageDownload';
import SignPetitionForm from '../templateParts/PageSections/Support/SignPetitionForm';
import ScrollAnimation from 'react-animate-on-scroll';

export default class SignPetition extends Component {
    render() {
        const { styles } = this.context;
        return (
            <Fragment>
                <Banner 
                    height="500px"
                    backgroundImage={`url(${require('../../assets/images/our-pricing-make-payment.jpg')})`}
                    title="Sign The Petition"
                />
                <div className={styles.colorlibAbout}>
                    <ScrollAnimation animateIn="fadeInUp">
                        <div className="container">
                            <div className="row">
                                <div className={`col-md-8 ${styles.animateBox}`}>
                                    <h2>Sign the Petition</h2>
                                    <p>The citizens of Texas petition all Texas County Taxing Entities to make an equal compensating adjustment to tax rates as property valuations increase to offset the total taxes levied.</p>
                                    <div>
                                        <ReactPlayer width="100%" url={`https://youtu.be/voU44YrWEDg`} />
                                    </div>
                                </div>
                                <div className={`col-md-4 ${styles.animateBox}`}>
                                    <SignPetitionForm />
                                </div>
                            </div>
                            
                        </div>

                    </ScrollAnimation>
                </div>

                <HomePageDownload />
            </Fragment>
        )
    }
}

SignPetition.contextType = CustomerContext;
