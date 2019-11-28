import React, { Component, Fragment } from 'react';
import Banner from '../templateParts/Banner';
import { CustomerContext } from "../../contexts/PDProvider";
import HomePageDownload from '../templateParts/PageSections/Home/HomePageDownload';
import SupportMain from '../templateParts/PageSections/Support/SupportMain';

export default class FormDownloads extends Component {
    render() {
        const { styles } = this.context;
        return (
            <Fragment>
                <Banner 
                    height="500px"
                    backgroundImage={`url(${require('../../assets/images/our-pricing-make-payment.jpg')})`}
                    title="Form Download"
                />
                <div className={styles.colorlibAbout}>
                    <div className="container">
                        <div className="row">
                            <div className={`col-md-8 ${styles.animateBox}`}>
                                <h2>Form Downloads</h2>
                                <p><a href={require("../../assets/forms/50-114.pdf")} target="_blank" rel="noopener noreferrer" >Homestead Exemption Application</a></p>
                            </div>
                            <div className={`col-md-4 ${styles.animateBox}`}>
                                <SupportMain />
                            </div>
                        </div>
                        
                    </div>
                </div>

                <HomePageDownload />
            </Fragment>
        )
    }
}

FormDownloads.contextType = CustomerContext;
