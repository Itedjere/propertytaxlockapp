import React, { useContext } from 'react';
import { Redirect } from "react-router-dom";

import { CustomerContext } from "../../contexts/PDProvider";

export default function Logout() {
    const myContext = useContext(CustomerContext);

    localStorage.removeItem("appState");
    myContext.emptyState();
    
    return (
        <div>
            <Redirect to="/login" />
        </div>
    );
};
