import React, { Component } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

export default class ContactForm extends Component {
    render() {
        return (
            <ScrollAnimation animateIn="fadeInUp">
                <h2>Contact Us</h2>
                <form>
                    <div className="row form-group">
                        <div className="col-md-12">
                            <label htmlFor="fname">Name<span>*</span></label>
                            <input type="text" id="fname" className="form-control" placeholder="Enter Your Name" />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-12">
                            <label htmlFor="email">Email<span>*</span></label>
                            <input type="text" id="email" className="form-control" placeholder="Your Email Address" />
                        </div>
                    </div>

                    <div className="row form-group mt-2">
                        <div className="col-md-12">
                            <label htmlFor="message">Message<span>*</span></label>
                            <textarea name="message" id="message" cols="30" rows="10" className="form-control" placeholder="How Can We Help You Today"></textarea>
                        </div>
                    </div>

                    <div className="row form-group mt-2">
                        <div className="col-md-12">
                            <input type="submit" value="Submit" className="btn btn-primary" />
                        </div>
                    </div>
                </form>	
            </ScrollAnimation>
        )
    }
}
