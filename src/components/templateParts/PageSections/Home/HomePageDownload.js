import React, { Component } from 'react';
import { CustomerContext } from '../../../../contexts/PDProvider';
import Col from 'react-bootstrap/Col';
import ScrollAnimation from 'react-animate-on-scroll';

class HomePageDownload extends Component {
    render() {
        const { styles } = this.context;
        return (
            <div 
                id={styles.colorlibSubscribe} 
                className={styles.colorlibSubscribe}
                style={{backgroundImage: `url(${require('../../../../assets/images/cover_img_1.jpg')})` }}
            >
                <div className={styles.overlay}></div>
                <div className="container">
                    <ScrollAnimation animateIn="fadeInUp">
                        <div className="row">
                            <Col md={{ span: 10, offset: 1 }} className={`text-center ${styles.colorlibHeading} ${styles.animateBox}`}>
                                <h2>Download your FREE property tax guide!</h2>
                                <p>Sign up for occasional emails from our property tax experts and receive your free guide.</p>
                            </Col>
                        </div>
                        <div className={`row ${styles.aimateBox}`}>
                            <Col md={{ span: 8, offset: 2 }}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <form className={`form-inline ${styles.qbstpHeaderSubscribe}`}>
                                            <div className={styles.colOneHalf}>
                                                <div className={`form-group ${styles.formGroup}`}>
                                                    <input type="text" id={styles.name} className={`form-control ${styles.formControl}`} placeholder="Enter Your Full Name" />
                                                </div>
                                            </div>
                                            <div className={styles.colOneHalf}>
                                                <div className={`form-group ${styles.formGroup}`}>
                                                    <input type="email" id={styles.email} className={`form-control ${styles.formControl}`} placeholder="Enter Your Email Address" />
                                                </div>
                                            </div>
                                            <div className={styles.colOneThird}>
                                                <div className={`form-group ${styles.formGroup}`}>
                                                    <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>GET IT NOW</button>
                                                </div>
                                            </div>
                                            {/* <div class="col-three-forth">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" id="email" placeholder="Enter your email">
                                                </div>
                                            </div>
                                            <div class="col-one-third">
                                                <div class="form-group">
                                                    <button type="submit" class="btn btn-primary">Subscribe Now</button>
                                                </div>
                                            </div> */}
                                        </form>
                                    </div>
                                </div>
                            </Col>
                        </div>
                    </ScrollAnimation>
                </div>
            </div>
        );
    }
}

HomePageDownload.contextType = CustomerContext;

export default HomePageDownload;