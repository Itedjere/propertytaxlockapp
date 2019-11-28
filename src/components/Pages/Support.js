import React, { Component, Fragment } from 'react';
import Banner from '../templateParts/Banner';
import { CustomerContext } from "../../contexts/PDProvider";
import HomePageDownload from '../templateParts/PageSections/Home/HomePageDownload';
import SupportMain from '../templateParts/PageSections/Support/SupportMain';
import ScrollAnimation from 'react-animate-on-scroll';

export default class Support extends Component {
    render() {
        const { styles } = this.context;
        return (
            <Fragment>
                <Banner 
                    height="500px"
                    backgroundImage={`url(${require('../../assets/images/members-of-our-team.jpg')})`}
                    title="Support"
                />

                <div className={`${styles.colorlibWorkFeatured} ${styles.colorlibBgWhite}`}>
                    <div className="container">
                        <div className={`row mb-4`}>
                            <div className={`col-md-8 ${styles.animateBox}`}>
                                <ScrollAnimation animateIn="fadeInUp">
                                    <div className={styles.desc}>
                                        <h2>Support</h2>
                                        <p>We have answered some common questions below. If you don’t find the answer to your question, send us a message and we’ll get you an answer right away.</p>
                                        <div className={styles.features}>
                                            <h3>Why hire Property Tax Lock, LLC?</h3>
                                            <div className={styles.fDesc}>
                                                <p>Do you have the resources necessary to research property sales and comparable assessments? We do – as a matter of fact, that’s our business. Do you have the time to take off work for several hours to attend an Appraisal Review Board hearing? We do – that’s our job.</p>
                                            </div>
                                        </div>
                                        <div className={styles.features}>
                                            <h3>If I hire you, will I need to attend my hearing?</h3>
                                            <div className={styles.fDesc}>
                                                <p>All you have to do is authorize Property Tax Lock, LLC as your agent. When you sign up with us, required forms to designate us as your agent will be provided on our website. No need to download, print and mail the forms to us. You will be able to sign the forms on-line, from your computer, tablet or smart phone. You do not need to attend the hearing.</p>
                                            </div>
                                        </div>
                                        <div className={styles.features}>
                                            <h3>Do you always get a reduction?</h3>
                                            <div className={styles.fDesc}>
                                                <p>No, we can’t guarantee a reduction, but we can guarantee we will use our extensive resources and 100+ years of combined experience to make sure your property tax value is fair and equal.</p>
                                            </div>
                                        </div>
                                        <div className={styles.features}>
                                            <h3>I’m considering selling my home. If you are successful in reducing my value, will it affect my listing price?</h3>
                                            <div className={styles.fDesc}>
                                                <p>No, prudent realtors will assist you in setting a selling price. Their objective is to obtain the highest price for your property based on current market conditions. Our objective is to obtain the lowest property tax value based on our knowledge of the property tax system and comparable property assessments.</p>
                                            </div>
                                        </div>
                                        <div className={styles.features}>
                                            <h3>Why do you charge a flat up-front fee?</h3>
                                            <div className={styles.fDesc}>
                                                <p>Our objective is to save you money, not take your savings. Property Tax Lock, LLC charges a reasonable flat fee based on your property’s market value. Other tax consulting firms charge from 25% to 50% of tax savings. We don’t believe in gouging our clients. We will work diligently with the highest degree of professionalism to make sure your property tax value is not excessive.</p>
                                            </div>
                                        </div>
                                        <div className={styles.features}>
                                            <h3>What is the deadline to file a protest?</h3>
                                            <div className={styles.fDesc}>
                                                <p>Due to a law change, the protest deadline for 2018 is May 15th on all property.</p>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollAnimation>
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

Support.contextType = CustomerContext;
