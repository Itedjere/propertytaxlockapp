import React, { Component, Fragment } from 'react';
// import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Banner from '../templateParts/Banner';
import { CustomerContext } from "../../contexts/PDProvider";
import HomePageDownload from '../templateParts/PageSections/Home/HomePageDownload';
import SupportMain from '../templateParts/PageSections/Support/SupportMain';

export default class Videos extends Component {
    render() {
        const { styles } = this.context;
        return (
            <Fragment>
                <Banner 
                    height="500px"
                    backgroundImage={`url(${require('../../assets/images/our-pricing-make-payment.jpg')})`}
                    title="Videos"
                />
                <div className={`${styles.colorlibWorkFeatured} ${styles.colorlibBgWhite}`}>
                    <div className="container">
                        <div className={`row`}>
                            <div className={`col-md-7 ${styles.animateBox}`}>
                                <div className={styles.desc}>
                                    <div className={`${styles.features} mb-5`}>
                                        <h3>Why hire Property Tax Lock, LLC?</h3>
                                        <p>
                                            <strong>Category: </strong>videos 
                                            <strong>Posted: </strong> 25th May, 2018
                                        </p>
                                        <div className={styles.fDesc}>
                                            <p>Do you have the resources necessary to research property sales and comparable assessments? We do – as a matter of fact, that’s our business. Do you have the time to take off work for several hours to attend an Appraisal Review Board hearing? We do – that’s our job.</p>
                                            <ReactPlayer width="100%" url={`https://www.youtube.com/embed/XVIce70k9Sc`} />
                                        </div>
                                    </div>
                                    <div className={`${styles.features} mb-5`}>
                                        <h3>If I hire you, will I need to attend my hearing?</h3>
                                        <p>
                                            <strong>Category: </strong>videos 
                                            <strong>Posted: </strong> 25th May, 2018
                                        </p>
                                        <div className={styles.fDesc}>
                                            <p>All you have to do is authorize Property Tax Lock, LLC as your agent. When you sign up with us, required forms to designate us as your agent will be provided on our website. No need to download, print and mail the forms to us. You will be able to sign the forms on-line, from your computer, tablet or smart phone. You do not need to attend the hearing.</p>
                                            <ReactPlayer width="100%" url={`https://www.youtube.com/embed/XVIce70k9Sc`} />
                                        </div>
                                    </div>
                                    <div className={`${styles.features} mb-5`}>
                                        <h3>Do you always get a reduction?</h3>
                                        <p>
                                            <strong>Category: </strong>videos 
                                            <strong>Posted: </strong> 25th May, 2018
                                        </p>
                                        <div className={styles.fDesc}>
                                            <p>No, we can’t guarantee a reduction, but we can guarantee we will use our extensive resources and 100+ years of combined experience to make sure your property tax value is fair and equal.</p>
                                            <ReactPlayer width="100%" url={`https://www.youtube.com/embed/XVIce70k9Sc`} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 offset-md-1 animate-box">
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

Videos.contextType = CustomerContext;
