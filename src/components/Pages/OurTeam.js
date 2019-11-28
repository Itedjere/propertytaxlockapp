import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../templateParts/Banner';
import { CustomerContext } from "../../contexts/PDProvider";
import HomePageDownload from '../templateParts/PageSections/Home/HomePageDownload';
import ScrollAnimation from 'react-animate-on-scroll';

export default class OurTeam extends Component {
    render() {

        const { styles } = this.context;

        return (
            <Fragment>
                <Banner 
                    height="500px"
                    backgroundImage={`url(${require('../../assets/images/members-of-our-team.jpg')})`}
                    title="Our Team"
                />
                <div className={styles.colorlibAbout}>
                    <div className="container">
                        <ScrollAnimation animateIn="fadeInUp">
                            <div className="row">
                                <div className={`col-md-12 text-left ${styles.colorlibHeading} ${styles.animateBox}`}>
                                    
                                    <p>Property Tax Lock, LLC is fully staffed with Licensed Property Tax Consultants. Our consultants have combined experience of more than 100 years representing property owners’ interests with various taxing authorities throughout the U.S.</p>

                                    <h2>Our staff experience and credentials include:</h2>
                                </div>
                            </div>
                        </ScrollAnimation>

                        <ScrollAnimation animateIn="fadeInUp">
                            <div className="row staff-members">
                                <div className={`col-xs-12 col-sm-6 text-left ${styles.animateBox} ${styles.rowMbSm}`}>
                                    <div className={styles.staffEntry}>
                                        <div className={styles.staffNumber}>
                                            1
                                        </div>
                                        <div className={styles.desc}>
                                            <p>Former Assistant Tax Assessor</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-xs-12 col-sm-6 text-left ${styles.animateBox} ${styles.rowMbSm}`}>
                                    <div className={styles.staffEntry}>
                                        <div className={styles.staffNumber}>
                                            2
                                        </div>
                                        <div className={styles.desc}>
                                            <p>Former Appraisal District Employee</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-xs-12 col-sm-6 text-left ${styles.animateBox} ${styles.rowMbSm}`}>
                                    <div className={styles.staffEntry}>
                                        <div className={styles.staffNumber}>
                                            3
                                        </div>
                                        <div className={styles.desc}>
                                            <p>Former District Property Tax Manager for a Fortune 500 Company</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-xs-12 col-sm-6 text-left ${styles.animateBox} ${styles.rowMbSm}`}>
                                    <div className={styles.staffEntry}>
                                        <div className={styles.staffNumber}>
                                            4
                                        </div>
                                        <div className={styles.desc}>
                                            <p>Former National Property Tax Manager for a Big 8 Accounting Firm</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-xs-12 col-sm-6 text-left ${styles.animateBox} ${styles.rowMbSm}`}>
                                    <div className={styles.staffEntry}>
                                        <div className={styles.staffNumber}>
                                            5
                                        </div>
                                        <div className={styles.desc}>
                                            <p>Former Vice President and Board Member for Texas Association of Property Tax Professionals</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-xs-12 col-sm-6 text-left ${styles.animateBox} ${styles.rowMbSm}`}>
                                    <div className={styles.staffEntry}>
                                        <div className={styles.staffNumber}>
                                            6
                                        </div>
                                        <div className={styles.desc}>
                                            <p>Former President and Board Member of Automated Tax Analysts</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-xs-12 col-sm-6 text-left ${styles.animateBox} ${styles.rowMbSm}`}>
                                    <div className={styles.staffEntry}>
                                        <div className={styles.staffNumber}>
                                            7
                                        </div>
                                        <div className={styles.desc}>
                                            <p>Licensed Texas Real Estate Broker</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-xs-12 col-sm-6 text-left ${styles.animateBox} ${styles.rowMbSm}`}>
                                    <div className={styles.staffEntry}>
                                        <div className={styles.staffNumber}>
                                            8
                                        </div>
                                        <div className={styles.desc}>
                                            <p>Licensed Texas Realtor</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-xs-12 col-sm-6 text-left ${styles.animateBox} ${styles.rowMbSm}`}>
                                    <div className={styles.staffEntry}>
                                        <div className={styles.staffNumber}>
                                            9
                                        </div>
                                        <div className={styles.desc}>
                                            <p>Attorney at Law</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-xs-12 col-sm-6 text-left ${styles.animateBox} ${styles.rowMbSm}`}>
                                    <div className={styles.staffEntry}>
                                        <div className={styles.staffNumber}>
                                            10
                                        </div>
                                        <div className={styles.desc}>
                                            <p>Former Appraisal Review Board Member</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className={`col-md-12 text-left ${styles.colorlibHeading} ${styles.animateBox}`}>
                                    <h2>Contact Us:</h2>
                                </div>
                                <div className={`col-md-12 text-left ${styles.colorlibHeading} ${styles.animateBox}`}>
                                    <p>
                                        Property Tax Lock, LLC<br />
                                        4204 SW Green Oaks Blvd Ste 150<br />
                                        Arlington, TX 76017
                                    </p>
                                    <p>If you would like to send us an email, use the contact form on our <Link to="/support">Support page</Link>.</p>
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

OurTeam.contextType = CustomerContext;
