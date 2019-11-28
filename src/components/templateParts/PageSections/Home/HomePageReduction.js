import React, { Component } from 'react';
import { CustomerContext } from '../../../../contexts/PDProvider';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ScrollAnimation from 'react-animate-on-scroll';
import LeafletMap from '../../LeafletMap/LeafletMap';

class HomePageReduction extends Component {
    
    render() {
        const { styles } = this.context;
        return (
            <div className={styles.colorlibIntro}>
                <Container>
                    <Row>
                        <ScrollAnimation animateIn="fadeInUp">
                            <Col md={{span: 8, offset: 2}} className={`text-center ${styles.colorlibHeading} ${styles.animateBox}`}>
                                <h2>2019 Reductions</h2>
                                <p>93% of the properties we protested in 2018 received a reduction in Market Value. Explore the map to see the actual market value reductions achieved by Property Tax Lock consultants.</p>
                            </Col>
                        </ScrollAnimation>
                    </Row>
                    <Row>
                        {/* <ScrollAnimation animateIn="fadeInUp">
                            <Col md={12} className={styles.animateBox}>
                                
                            </Col>
                        </ScrollAnimation> */}
                        <LeafletMap />
                    </Row>
                </Container>
            </div>
        );
    }
}

HomePageReduction.contextType = CustomerContext;

export default HomePageReduction;