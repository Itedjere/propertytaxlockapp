import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const AlertMessage = props => {
    const { variant, dismissible, children } = props;
    const [show, setShow] = useState(true);
    return (
        <>
            <Alert 
                show={show} onClose={() => setShow(false)} 
                variant={variant} 
                dismissible={dismissible}
            >
                { children }
            </Alert>
        </>
    );
};


export default AlertMessage;