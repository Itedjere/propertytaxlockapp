import React from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';

export default function QuickLinks() {
    return (
        <ScrollAnimation animateIn="fadeInUp">
            <h2>Quick Links</h2>
            <ul>
                <li><Link to="/support"> Support</Link></li>
                <li><Link to="/videos"> Videos</Link></li>
                <li><Link to="/news"> News</Link></li>
                <li><Link to="/form-downloads"> Form Downloads</Link></li>
            </ul>
        </ScrollAnimation>
    )
}
