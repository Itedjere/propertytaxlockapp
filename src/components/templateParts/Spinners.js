import React, { Fragment } from 'react';

const Spinners = props => {
    return (
        <Fragment>
                <img src={`${require('../../assets/images/ajax-loader.gif')}`} width="32" height="30" alt="Loading..." />
        </Fragment>
    );
};


export default Spinners;