import React, { Fragment, Component } from 'react';
import Banner from '../templateParts/Banner';
import { CustomerContext } from "../../contexts/PDProvider";
import '../../assets/css/simplesteps.css';
import ScrollAnimation from 'react-animate-on-scroll';

export default class HowItWorks extends Component {

    render() {
        const { styles } = this.context;

        return (
            <Fragment>
                <Banner 
                    height="500px"
                    backgroundImage={`url(${require('../../assets/images/people-coffee-tea-meeting.jpg')})`}
                    title="How Property Tax Lock Works"
                />

                <div className={`${styles.colorlibWorkFeatured} ${styles.colorlibBgWhite}`}>
                    <div className="container">
                        <ScrollAnimation animateIn="fadeInUp">
                            <div className="row">
                                <div className={`col-md-10 offset-md-1 text-center ${styles.colorlibHeading} ${styles.animateBox}`}>
                                    <h2 style={{paddingBottom: "35px"}}>
                                        3 simple steps to protect your property from an unfair tax valuation:
                                    </h2>
                                    <div className="steps-container">
                                        <div className="row flex-step-containers">
                                            <div className="col-sm-3 flex-items shadow-lg">
                                                <div>
                                                    <span>1</span>
                                                    <p>Find Your Property, View Your Property And Also Your Rating</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-3 flex-items shadow-lg">
                                                <div>
                                                    <span>2</span>
                                                    <p>Signup with Property Tax Lock By Entering Your Information and Signing Documents</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-3 flex-items shadow-lg">
                                                <div>
                                                    <span>3</span>
                                                    <p>
                                                        Follow along in your dashboard as we work through the process
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className={`col-md-12 text-center ${styles.colorlibHeading} ${styles.animateBox} ${styles.rowMtSm}`}>
                                    <h2>What Property Tax Lock will do for you:</h2>
                                </div>
                                <div className={`col-md-12 ${styles.animateBox} ${styles.ptlTimelineVert}`}>
                                    <div className={`${styles.ptlTimelineVertSection} ${styles.ptlTimelineVertSectionLined}`}>
                                        <span className={`${styles.progressBarStep} ${styles.progressBarStepPtl}`}>1</span>
                                        <div className={`${styles.ptlTimelineVertContent}`}>
                                            <h3>Submit your signed Appointment of Agent to the taxing authority</h3>
                                            <p>Once you sign the legally required Appointment of Agent form, we will electronically submit to your Appraisal Review Board.</p>
                                        </div>
                                    </div>

                                    <div className={`${styles.ptlTimelineVertSection} ${styles.ptlTimelineVertSectionLined}`}>
                                        <span className={`${styles.progressBarStep} ${styles.progressBarStepPtl}`}>2</span>
                                        <div className={`${styles.ptlTimelineVertContent}`}>
                                            <h3>File your protest in a timely manner</h3>
                                            <p>We will file your protest as soon as we are legally able to do so.</p>
                                        </div>
                                    </div>

                                    <div className={`${styles.ptlTimelineVertSection} ${styles.ptlTimelineVertSectionLined}`}>
                                        <span className={`${styles.progressBarStep} ${styles.progressBarStepPtl}`}>3</span>
                                        <div className={`${styles.ptlTimelineVertContent}`}>
                                            <h3>Notify you of your hearing date and time</h3>
                                            <p>We will schedule the hearing, but we will try to settle informally first. If a hearing is required, we will attend on your behalf.</p>
                                        </div>
                                    </div>

                                    <div className={`${styles.ptlTimelineVertSection} ${styles.ptlTimelineVertSectionLined}`}>
                                        <span className={`${styles.progressBarStep}`}><span className="icon-like"></span></span>
                                        <div className={`${styles.ptlTimelineVertContent} ${styles.ptlTimelineVertContentCta}`}>
                                            <h3>Ready to sign up?</h3>
                                            <p>You've read through just <b>25% of our process</b>. As you can see, we will work tirelessly to get your property the fair valuation it deserves. Start the process by analyzing your property, then let Property Tax Lock do what we do best.</p>
                                            <p><a className="btn btn-primary standard-button" href="/">Get Started Now</a></p>
                                        </div>
                                    </div>

                                    <div className={`${styles.ptlTimelineVertSection} ${styles.ptlTimelineVertSectionLined}`}>
                                        <span className={`${styles.progressBarStep} ${styles.progressBarStepPtl}`}>4</span>
                                        <div className={`${styles.ptlTimelineVertContent}`}>
                                            <h3>Gather pertinent property information</h3>
                                            <p>Using our own algorithms and considerable property data, we will collect information on your property as well as comparable properties.</p>
                                        </div>
                                    </div>

                                    <div className={`${styles.ptlTimelineVertSection} ${styles.ptlTimelineVertSectionLined}`}>
                                        <span className={`${styles.progressBarStep} ${styles.progressBarStepPtl}`}>5</span>
                                        <div className={`${styles.ptlTimelineVertContent}`}>
                                            <h3>Review the property worksheet you provided</h3>
                                            <p>We will review any information you provided on our property information worksheet, and photos or documents you uploaded.</p>
                                        </div>
                                    </div>

                                    <div className={`${styles.ptlTimelineVertSection} ${styles.ptlTimelineVertSectionLined}`}>
                                        <span className={`${styles.progressBarStep} ${styles.progressBarStepPtl}`}>6</span>
                                        <div className={`${styles.ptlTimelineVertContent}`}>
                                            <h3>Prepare a market approach to value case</h3>
                                            <p>We will analyze the market value of your property along with comparables, and prepare an approach to have your property valued fairly.</p>
                                        </div>
                                    </div>

                                    <div className={`${styles.ptlTimelineVertSection} ${styles.ptlTimelineVertSectionLined}`}>
                                        <span className={`${styles.progressBarStep} ${styles.progressBarStepPtl}`}>7</span>
                                        <div className={`${styles.ptlTimelineVertContent}`}>
                                            <h3>Assess the Appraisal District's methodology </h3>
                                            <p>We will evaluate the formula used by the Appraisal District to value your property to gain insight for your case.</p>
                                        </div>
                                    </div>

                                    <div className={`${styles.ptlTimelineVertSection} ${styles.ptlTimelineVertSectionLined}`}>
                                        <span className={`${styles.progressBarStep}`}><span className="icon-users"></span></span>
                                        <div className={`${styles.ptlTimelineVertContent} ${styles.ptlTimelineVertContentCta}`}>
                                            <h3>Let the professionals at Property Tax Lock fight for you.</h3>
                                            <p>You can login to your account dashboard to follow along as we exhaust all available methods to protest your tax appraisal value.</p>
                                            <p><a className="btn btn-primary standard-button" href="/">Get Started Now</a></p>
                                        </div>
                                    </div>

                                    <div className={`${styles.ptlTimelineVertSection} ${styles.ptlTimelineVertSectionLined}`}>
                                        <span className={`${styles.progressBarStep} ${styles.progressBarStepPtl}`}>8</span>
                                        <div className={`${styles.ptlTimelineVertContent}`}>
                                            <h3>Attempt to settle informally</h3>
                                            <p>We may attempt to settle your property valuation informally.</p>
                                        </div>
                                    </div>

                                    <div className={`${styles.ptlTimelineVertSection} ${styles.ptlTimelineVertSectionLined}`}>
                                        <span className={`${styles.progressBarStep} ${styles.progressBarStep_2ch} ${styles.progressBarStepPtl}`}>9</span>
                                        <div className={`${styles.ptlTimelineVertContent}`}>
                                            <h3>Prepare a case to submit at the time of a formal hearing</h3>
                                            <p>Using our market value approach, we will prepare a solid case for a fair valuation.</p>
                                        </div>
                                    </div>

                                    <div className={`${styles.ptlTimelineVertSection} ${styles.ptlTimelineVertSectionLined}`}>
                                        <span className={`${styles.progressBarStep} ${styles.progressBarStep_2ch} ${styles.progressBarStepPtl}`}>10</span>
                                        <div className={`${styles.ptlTimelineVertContent}`}>
                                            <h3>Present prepared case to the Appraisal Review Board</h3>
                                            <p>We will challenge the Appraisal District’s evidence, and provide evidence that supports our prepared case to have your property fairly evaluated.</p>
                                        </div>
                                    </div>

                                    <div className={`${styles.ptlTimelineVertSection} ${styles.ptlTimelineVertSectionLined}`}>
                                        <span className={`${styles.progressBarStep} ${styles.progressBarStep_2ch} ${styles.progressBarStepPtl}`}>11</span>
                                        <div className={`${styles.ptlTimelineVertContent}`}>
                                            <h3>Communicate the results of the hearing</h3>
                                            <p>We will send you an email with your results, along with any recommendations available after the hearing.</p>
                                        </div>
                                    </div>

                                    <div className={`${styles.ptlTimelineVertSection} ${styles.ptlTimelineVertSectionR}`}>
                                        <span className={`${styles.progressBarStep} ${styles.progressBarStep_2ch} ${styles.progressBarStepPtl}`}>12</span>
                                        <div className={`${styles.ptlTimelineVertContent}`}>
                                            <h3>Provide you a final value notice by mail</h3>
                                            <p>As your protest agent, we will receive an official notice of your final value. We'll ship it out to you immediately, and send you an email to let you know it's on the way.</p>
                                        </div>
                                    </div>
                        
                                </div>
                            </div>
                        </ScrollAnimation>
                    </div>
                </div>
            </Fragment>
        )
    }
}

HowItWorks.contextType = CustomerContext;