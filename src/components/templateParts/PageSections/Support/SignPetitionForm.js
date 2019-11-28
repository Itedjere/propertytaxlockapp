import React, { Component } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

export default class SignPetitionForm extends Component {
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
                            <input type="submit" value="Sign The Petition" className="btn btn-primary" />
                        </div>
                    </div>
                </form>	
            </ScrollAnimation>
        )
    }
}
