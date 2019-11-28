import React, { Component } from 'react';
import AlertMessage from '../../AlertMessage';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'

export default class CouponForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            couponCode: '',
        }
    }

    onCouponChange = (event) => {
        this.setState({ couponCode: event.target.value });
    }

    submitCouponCode = () => {
        if (this.state.couponCode !== "") {
            const { couponCode } = this.state;
            this.props.validateAndApplyCouponCode(couponCode);
            this.setState({ couponCode: '' });
        }
        
    }

    render() {
        return (
            <AlertMessage 
                variant="dark"
                dismissible={false} 
            >
                <div className="form-row">
                    <div className="form-group col-md-8 mb-0">
                        <input 
                            className="form-control" 
                            type="text" 
                            placeholder="Offer Code" 
                            value={this.state.couponCode}
                            onChange={this.onCouponChange}
                        />
                    </div>
                    <div className="form-group col-md-4 mb-0">
                        <Button 
                            variant="primary" 
                            type="button" 
                            style={{fontSize: '14px'}}
                            block
                            onClick={this.submitCouponCode}
                        >
                            Apply Code
                        </Button>
                    </div>
                </div>
                <Alert 
                    variant={this.props.couponMessageIndicator} 
                    onClose={() => this.props.closeAlert()} 
                    dismissible
                    show={this.props.isCouponMessage}
                    className="mt-2 mb-0 py-0"
                >
                    {this.props.couponMessage}
                </Alert>

            </AlertMessage>
        )
    }
}
