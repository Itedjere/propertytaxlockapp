import React from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';
import { ProductConsumer } from '../../../../contexts/PDProvider';

const HomePageHowItWorks = props => {
    return (
		<ProductConsumer>
			{value => {
				const { styles } = value;
				return (
					<div className={`${styles.colorlibServices} ${styles.colorlibBgWhite}`}>
						<div className="container">
							<div className="row">
								<ScrollAnimation animateIn="fadeInUp">
									<div className={`col-md-12 text-center ${styles.colorlibHeading} ${styles.animateBox}`}>
										<h2>How does Property Tax Lock work?</h2>
										<p>The competition typically charges 25% -50% of property tax value savings or exorbitant flat fees. Property Tax Lock provides a higher level of service for one reasonable flat fee.</p>
									</div>
								</ScrollAnimation>
								
								<div className={`col-md-4 text-center ${styles.animateBox}`}>
									<ScrollAnimation animateIn="fadeInUp">
										<div className={styles.services}>
											<span className={styles.icon}>
												<i className="icon-home"></i>
											</span>
											<div className={styles.desc}>
												<h3>Find Your Property</h3>
												<p>Enter your name, street address, or account number in the box above to find your property in our database.</p>
												<p><Link to="#" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnOutline} ${styles.withArrow}`}>Search Now <i className="icon-arrow-right3"></i></Link></p>
											</div>
										</div>
									</ScrollAnimation>
								</div>
								<div className={`col-md-4 text-center ${styles.animateBox}`}>
									<ScrollAnimation animateIn="fadeInUp" delay={500}>
										<div className={styles.services}>
											<span className={styles.icon}>
												<i className="icon-bar-graph"></i>
											</span>
											<div className={styles.desc}>
												<h3>View Your Property </h3>
												<p>Using our Tax Reduction Indicator technology, see your chances of getting your property tax reduced.</p>
												<p><Link to="#" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnOutline} ${styles.withArrow}`}>Search And View Your Rating <i className="icon-arrow-right3"></i></Link></p>
											</div>
										</div>
									</ScrollAnimation>
								</div>
								<div className={`col-md-4 text-center ${styles.animateBox}`}>
									<ScrollAnimation animateIn="fadeInUp" delay={1000}>
										<div className={styles.services}>
											<span className={styles.icon}>
												<i className="icon-lock"></i>
											</span>
											<div className={styles.desc}>
												<h3>Let Us Handle It</h3>
												<p>Relax and let the professionals at Property Tax Lock take every step possible to save you money.</p>
												<p><Link to="#" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnOutline} ${styles.withArrow}`}>Learn More About The Process <i className="icon-arrow-right3"></i></Link></p>
											</div>
										</div>
									</ScrollAnimation>
								</div>
							</div>
						</div>
					</div>
				);
			}}
		</ProductConsumer>
    );
};


export default HomePageHowItWorks;