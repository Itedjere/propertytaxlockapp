import React, { Component, Fragment } from 'react';
import HomePageReduction from '../templateParts/PageSections/Home/HomePageReduction';
import HomePageSignPetition from '../templateParts/PageSections/Home/HomePageSignPetition';
import HomPageHowItWorks from '../templateParts/PageSections/Home/HomePageHowItWorks';
import HomePageHappyCustomers from '../templateParts/PageSections/Home/HomePageHappyCustomers';
import HomePageDownload from '../templateParts/PageSections/Home/HomePageDownload';
import HomePageSearch from '../templateParts/PageSections/Home/HomePageSearch';



class Home extends Component {
    render() {
        return (
            <Fragment>
                <HomePageSearch />
                <HomePageReduction />
                <HomePageSignPetition />
                <HomPageHowItWorks />
                <HomePageHappyCustomers />
                <HomePageDownload />
            </Fragment>
        );
    }
}


export default Home;