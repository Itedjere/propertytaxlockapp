import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../templateParts/Banner';
import { CustomerContext } from "../../contexts/PDProvider";
import HomePageDownload from '../templateParts/PageSections/Home/HomePageDownload';
import ScrollAnimation from 'react-animate-on-scroll';

export default class Pricing extends Component {
    render() {
        const { styles } = this.context;
        return (
            <Fragment>
                <Banner 
                    height="500px"
                    backgroundImage={`url(${require('../../assets/images/our-pricing-make-payment.jpg')})`}
                    title="Pricing"
                />
                <div className={styles.colorlibAbout}>
                    <div className="container">
                        <ScrollAnimation animateIn="fadeInUp">
                            <div className="row">
                                <div className={`col-md-12 text-left ${styles.colorlibHeading} ${styles.animateBox}`}>
                                    <h2>Pricing</h2>
                                    <p>Our fees range from $124-$324, depending on your property value.</p>
                                    <p>There may be a discount code available on certain properties.</p>
                                    <p>Property Tax Lock, LLC does not offer a contingency fee at this time. This is also known as a percentage of savings. You need to be careful when choosing a company that offers a so-called “contingency fee”. A flat fee allows you to keep all of your savings.</p>
                                    <p>Property Tax Lock, LLC prepares a protest based on market value and an equitable approach to value.</p>
                                    <p>If you would like to know the fee for your property, <Link to="/">enter your address</Link> and choose Protest Now. You will see the fee in the checkout before you pay anything so you can make an informed decision.</p>
                                </div>
                            </div>
                        </ScrollAnimation>
                        
                    </div>
                </div>

                <HomePageDownload />
            </Fragment>
        )
    }
}

Pricing.contextType = CustomerContext;
