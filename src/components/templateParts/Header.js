import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { ProductConsumer } from '../../contexts/PDProvider';

export default function Header(props) {
    const [ showNav, setShowNav ] = useState(false);
    return (
        <ProductConsumer>
            {value => {
                const {styles} = value;
                return (
                    <Fragment>
                        <button 
                            type="button"
                            className={`js-colorlib-nav-toggle ${styles.colorlibNavToggle} ${styles.colorlibNavWhite} ${showNav ? styles.active : ``}`}
                            onClick={() => setShowNav(!showNav)}
                        >
                            <i></i>
                        </button>

                        <div id={styles.colorlibOffcanvas} className={showNav ? styles.offcanvas : ``}>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/how-it-works">How It Works</Link>
                                </li>
                                <li><Link to="/our-team">Our Team</Link></li>
                                <li><Link to="/pricing">Pricing</Link></li>
                                <li><Link to="/support">Support</Link></li>
                                <li><Link to="/login">Login</Link></li>
                            </ul>
                        </div>

                        {showNav && (
                            <div 
                                className={styles.transparentToggler}
                                onClick={() => setShowNav(!showNav)}></div>
                        )}

                        <nav className={styles.colorlibNav} role="navigation">
                            <div className={styles.topMenu}>
                                <div className="row">
                                    <div className="col-sm-2 col-md-2">
                                        <div id="colorlib-logo">
                                            <Link to="/">
                                                <img 
                                                    src={require("../../assets/images/PTL_Logo_Outlines_cloudconvert.svg")} 
                                                    className="img-responsive" 
                                                    alt="property tax lock" 
                                                    width="150" 
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                    <div 
                                        className={`col-sm-10 col-md-10 text-right ${styles.menu_1}`}
                                    >
                                        <ul>
                                            <li className="active">
                                                <Link to="/how-it-works">How It Works</Link>
                                            </li>
                                            <li><Link to="/our-team">Our Team</Link></li>
                                            <li><Link to="/pricing">Pricing</Link></li>
                                            <li><Link to="/support">Support</Link></li>
                                            <li><Link to="/login">Login</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </Fragment>
                )
            }}
        </ProductConsumer>
    );
};