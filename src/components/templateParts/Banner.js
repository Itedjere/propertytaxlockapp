import React from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';

import { ProductConsumer } from '../../contexts/PDProvider';

const Banner = props => {
    const { height, backgroundImage, title, children } = props; 
    return (
        <ProductConsumer>
            {value => {
                const { styles } = value;
                return (
                    <section 
                        id={styles.home} 
                        className={styles.videoHero} 
                        style={{
                            height: height, 
                            backgroundImage: backgroundImage,  
                            backgroundSize: 'cover',  
                            backgroundPosition: 'center center',
                            backgroundAttachment:  'fixed'
                        }} 
                        data-section="home"
                    >
                        <div className={styles.overlay}></div>
                        
                            <div className={`${styles.displayT} ${styles.displayT2} text-center`}>
                                <div className={`${styles.displayTc} ${styles.displayTc2}`}>
                                    <div className="container">
                                        <div className="col-md-12 col-md-offset-0">
                                            <div className={styles.animateBox}>
                                                <ScrollAnimation animateIn="fadeInUp">
                                                    <h2>{ title }</h2>
                                                    { children }
                                                    <p className={styles.breadcrumbs}><span><Link to="/">Home</Link></span> <span>{title}</span></p>
                                                </ScrollAnimation>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        
                    </section>
                );
            }}
        </ProductConsumer>
    );
};


export default Banner;