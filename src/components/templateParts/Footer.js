import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CustomerContext } from '../../contexts/PDProvider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Footer extends Component {
    render() {
        const { styles } = this.context;
        return (
            <div>
                <footer id={styles.colorlibFooter}>
                    <Container>
                        <Row>
                            <Col md={4} className={styles.colorlibWidget}>
                                <h4>Quick Links</h4>
                                <ul className={styles.colorlibFooterLinks}>
                                    <li><Link to="/how-it-works"><i className={styles.iconCheck}></i> How It Works</Link></li>
                                    <li><Link to="/our-team"><i className={styles.iconCheck}></i> Our Team</Link></li>
                                    <li><Link to="/pricing"><i className={styles.iconCheck}></i> Pricing</Link></li>
                                    <li><Link to="/support"><i className={styles.iconCheck}></i> Support</Link></li>
                                    <li><Link to="/login"><i className={styles.iconCheck}></i> Login</Link></li>
                                </ul>
                            </Col>
                            <Col md={4} className={styles.colorlibWidget}>
                                <h4>Latest News</h4>
                                <div className={styles.fBlog}>
                                    <Link 
                                        to="/blog" 
                                        className={styles.blogImg} 
                                        style={{ backgroundImage: `url(${require('../../assets/images/blog-1.jpg')})` }}>
                                    </Link>
                                    <div className={styles.desc}>
                                        <h2><Link to="/blog">Photoshoot Technique</Link></h2>
                                        <p className={styles.admin}><span>30 March 2018</span></p>
                                    </div>
                                </div>
                                <div className={styles.fBlog}>
                                    <Link 
                                        to="/blog" 
                                        className={styles.blogImg} 
                                        style={{ backgroundImage: `url(${require('../../assets/images/blog-2.jpg')})` }}>
                                    </Link>
                                    <div className={styles.desc}>
                                        <h2><Link to="/blog">Photoshoot Technique</Link></h2>
                                        <p className={styles.admin}><span>30 March 2018</span></p>
                                    </div>
                                </div>
                                <div className={styles.fBlog}>
                                    <Link 
                                        to="/blog" 
                                        className={styles.blogImg} 
                                        style={{ backgroundImage: `url(${require('../../assets/images/blog-3.jpg')})` }}>
                                    </Link>
                                    <div className={styles.desc}>
                                        <h2><Link to="/blog">Photoshoot Technique</Link></h2>
                                        <p className={styles.admin}><span>30 March 2018</span></p>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4} className={styles.colorlibWidget}>
                                <h4>Contact Info</h4>
                                <ul className={styles.colorlibFooterLinks}>
                                    <li>4204 SW Green Oaks Blvd Ste 150 Arlington, TX 76017 </li>
                                    <li><Link to="/tel://8177570086 "><i className="icon-phone"></i> 817-757-0086 </Link></li>
                                    <li><Link to="/mailto:sales@propertytaxlock.com "><i className="icon-envelope"></i> sales@propertytaxlock.com </Link></li>
                                </ul>
                                <ul className={styles.colorlibSocialIcons}>
                                    <li><Link to="#"><i className="icon-facebook"></i></Link></li>
                                    <li><Link to="#"><i className="icon-twitter"></i></Link></li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </div>
        );
    }
}

Footer.contextType = CustomerContext;

export default Footer;