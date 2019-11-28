import React, { Component } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { CustomerContext } from '../../../../contexts/PDProvider';
import Col from 'react-bootstrap/Col';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

class HomePageHappyCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                center: true,
                loop: true,
                autoplay: true,
                autoplayTimeout: 10000,
                items: 1,
                margin: 30,
                stagePadding: 0,
                navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
                nav: false,
                responsive:{
                    0:{
                        items: 1
                    },
                    600:{
                        items: 1
                    },
                    1000:{
                        items: 1
                    }
                }
            },
        }
    }


    render() {
        const { styles } = this.context;
        return (
            <div className={styles.colorlibBlog}>
                <div className="container">
                    <ScrollAnimation animateIn="fadeInUp">
                        <div className="row">
                            <Col md={{ span: 8, offset: 2 }} className={`text-center ${styles.colorlibHeading} ${styles.animateBox}`}>
                                <h2>Happy Customers</h2>
                                <p>We've saved our customers thousands, and we can help you too</p>
                            </Col>
                        </div>
                        <div className={`row ${styles.testimonial}`}>
                            <div className="col-md-8 offset-md-2">
                                <OwlCarousel
                                    className="carousel-testimony owl-carousel ftco-owl"
                                    {...this.state.options}
                                >
                                    <div className={`col-md-12 ${styles.animateBox} ${styles.rowMbSm}`}>
                                        <article>
                                            <h2>T. K.</h2>
                                            <p>You are AMAZING!  I was thrilled and shocked at the same time when I saw the TARB Final Order showing a $90K reduction in valuation.  I knew from the first time I met you both that you had a passion for this business and compassion for my situation.  Bless you for that! I know the hearing and research cost you alot more than you initially charged me.  I am happy to pay additional for your services, so please send me an invoice. </p>
                                            <p className={styles.admin}><span>From Keller, TX</span></p>
                                        </article>
                                    </div>
                                    <div className={`col-md-12 ${styles.animateBox} ${styles.rowMbSm}`}>
                                        <article>
                                            <h2>L. J.</h2>
                                            <p>I’ve been a client since 1999 and you have performed with professionalism and terrific results year after year. I look forward to receiving your report every year. This time a $122,518 reduction. I especially like your new on-line sign up process. No more waiting for documents and mailing back and forth. </p>
                                            
                                            <p className={styles.admin}><span>From Arlington, TX </span></p>
                                        </article>
                                    </div>
                                    <div className={`col-md-12 ${styles.animateBox} ${styles.rowMbSm}`}>
                                        <article>
                                            <h2>D. M.</h2>
                                            <p>After all these years of representing me on my commercial property, I finally realized you could help me on my residential property as well. Boy, I am glad I asked if you could help. I consider the fee of $100 for my $234,029 reduction absolutely ridiculous. Please, continue to monitor my tax value and protest every year going forward as you have done on my commercial property. What a great value! </p>
                                            
                                            <p className={styles.admin}><span>From Mansfield, TX</span></p>
                                        </article>
                                    </div>

                                    <div className={`col-md-12 ${styles.animateBox} ${styles.rowMbSm}`}>
                                        <article>
                                            <h2>J. U.</h2>
                                            <p>No promise or guarantee of a reduction, are you kidding me? The $152,540 value reduction on my home is un-believable. I’ve told all my neighbors. You can expect calls from them in 2017. </p>
                                            
                                            <p className={styles.admin}><span>From Fort Worth, TX </span></p> 
                                        </article>
                                    </div>
                                    <div className={`col-md-12 ${styles.animateBox} ${styles.rowMbSm}`}>
                                        <article>
                                            <h2>D. D.</h2>
                                            <p>$32,964 reduction in my homes property tax value and a reasonable fee…..great service and result. I’ll sign up again next year. </p>
                                            
                                            <p className={styles.admin}><span>From Fort Worth, TX </span></p> 
                                        </article>
                                    </div>
                                    <div className={`col-md-12 ${styles.animateBox} ${styles.rowMbSm}`}>
                                        <article>
                                            <h2>M. K.</h2>
                                            <p>You can be sure, the reduction of $41,647 is appreciated. The savings will help me make some needed repairs. Thank you for a great job. </p>
                                            
                                            <p className={styles.admin}><span>From Fort Worth, TX</span></p>
                
                                        </article>
                                    </div>

                                    <div className={`col-md-12 ${styles.animateBox} ${styles.rowMbSm}`}>
                                        <article>
                                            <h2>J. U.</h2>
                                            <p>Well, I thought the reduction on my other house was great and now you surprise me with a reduction of $201,353 on this one. Way to go! </p>
                                            
                                            <p className={styles.admin}><span>From Fort Worth, TX </span></p> 
                                        </article>
                                    </div>
                                    <div className={`col-md-12 ${styles.animateBox} ${styles.rowMbSm}`}>
                                        <article>
                                            <h2>D. I.</h2>
                                            <p>You came through again. Thank you so much!....reduction of $820,280.</p>
                                            
                                            <p className={styles.admin}><span>From Tarrant County, TX </span></p> 

                                        </article>
                                    </div>
                                    <div className={`col-md-12 ${styles.animateBox} ${styles.rowMbSm}`}>
                                        <article>
                                            <h2>S. M.</h2>
                                            <p> received your report concerning my property tax value. Wow, a reduction from $1,976,375 to $1,395,875. Now, that’s what I call great service. I didn’t expect that kind of success. You can bet I’ll be a client forever. </p>
                                            
                                            <p className={styles.admin}><span>From Fort Worth, TX</span></p>
                
                                        </article>
                                    </div>
                                    <div className={`col-md-12 ${styles.animateBox} ${styles.rowMbSm}`}>
                                    <article>
                                        <h2>W. V.</h2>
                                        <p>What a value, a fee of $100 annually and this year a value savings of $872,883. How can you do this so cheap? </p>
                                        
                                        <p className={styles.admin}><span>From Fort Worth, TX </span></p>
            
                                    </article>
                                </div>
                                </OwlCarousel>
                            </div>
                        </div>
                    </ScrollAnimation>
                </div>
            </div>
        );
    }
}

HomePageHappyCustomers.contextType = CustomerContext;

export default HomePageHappyCustomers;