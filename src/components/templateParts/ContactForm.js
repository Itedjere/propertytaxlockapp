import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

class ContactForm extends Component {
    render() {
        return (
            <>
                <h2>Contact Us</h2>
                <Form>
                    <Form.Group controlId="fname">
                        <Form.Label>Name<span>*</span></Form.Label>
                        <Form.Control type="text" placeholder="Enter Your Name" />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email address<span>*</span></Form.Label>
                        <Form.Control type="email" placeholder="Enter email Address" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Message<span>*</span></Form.Label>
                        <Form.Control as="textarea" rows="3" />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </>
        );
    }
}

export default ContactForm;