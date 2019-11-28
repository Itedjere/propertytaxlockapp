import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const SideBar = props => {
    return (
        <>
            <h2>Quick Links</h2>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <Link to="/support">Support</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link to="/videos">Videos</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link to="/news">News</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link to="/downloads">Form Downloads</Link>
                </ListGroup.Item>
            </ListGroup>
        </>
    );
};


export default SideBar;