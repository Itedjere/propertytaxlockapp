import React, { Component } from 'react';

import '../assets/css/icomoon.css';
import '../assets/css/animate.css';
import { CustomerContext } from '../contexts/PDProvider';

import Header from '../components/templateParts/Header';
import Footer from '../components/templateParts/Footer';
import ScrollToTop from './ScrollToTop';
import GoToTop from './GoToTop';

class DefaultPublic extends Component {
    render() {
        const { styles } = this.context;
        const { children } = this.props;
        return (
            <div id={styles.page}>
                <ScrollToTop />
                <Header />
                    { children }
                <Footer />
                <GoToTop scrollStepInPx="50" delayInMs="16.66" />
            </div>
        );
    }
}
DefaultPublic.contextType = CustomerContext;

export default DefaultPublic;