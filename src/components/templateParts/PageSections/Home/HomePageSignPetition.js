import React from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';

import { ProductConsumer } from '../../../../contexts/PDProvider';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HomePageSignPetition = props => {
    return (
		<ProductConsumer>
			{value => {
				const { styles } = value;
				return (
					<div 
						id={styles.colorlibSubscribe}
						className={styles.colorlibSubscribe}
						style={{backgroundImage: `url(${require('../../../../assets/images/cover_img_1.jpg')})`}}
					>
						<div className={styles.overlay}></div>
						<ScrollAnimation animateIn="fadeInUp">
							<Container>
								<Row>
									<Col md={{ span: 10, offset: 1 }} className={`text-center ${styles.colorlibHeading} ${styles.animateBox}`}>
										<h2>Increasing property valuations must be offset by tax rate adjustments.</h2>
									</Col>
								</Row>
								<Row className={styles.animateBox}>
									<Col md={{ span: 6, offset: 3 }}>
										<Row>
											<Col md={12}>
												<p className={styles.cta}>
													<Link to="/sign-the-petition" className={`${styles.btn} ${styles.btnPrimary}`}>SIGN THE PETITION</Link>
												</p>
											</Col>
										</Row>
									</Col>
								</Row>
							</Container>

						</ScrollAnimation>
					</div>
				);
			}}
		</ProductConsumer>
    );
};


export default HomePageSignPetition;