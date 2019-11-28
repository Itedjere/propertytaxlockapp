import React, { Component, Fragment } from 'react';
import CartSummary from '../Cart/CartSummary';
import CreditCardDetails from './CreditCardDetails';
import AlertMessage from '../../AlertMessage';
import Spinners from '../../Spinners';

const GlobalOrderPaymentStyle = { 
    backgroundColor: '#ffffff', 
    padding: '15px', 
    height: '100%' 
};

const loadingContainer = {
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

class OrderPayment extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            Loading: true,
        }
    }

    setLoading = () => this.setState((state) => ({ Loading: !state.Loading }))

    render() {
        return (
            <div style={GlobalOrderPaymentStyle} className="position-relative">
                <h3>Your Order</h3>
                <CartSummary 
                    setCouponID={this.props.setCouponID} 
                    hideCreditCardDetails={this.props.hideCreditCardDetails} 
                    setLoading={this.setLoading} 
                />
                {!this.props.isCreditCardDetailsHidden && <CreditCardDetails {...this.props} />}
                
                <div className="form-row">
                    <div className="form-group col-md-12 mt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <img src={require('../../../../assets/images/credit-cards/siteseal_gd_3_h_l_m.gif')} alt="verified and secured" height="32" /> 
                        <button 
                            className="btn btn-primary" 
                            type="submit" 
                            disabled={this.props.isSubmitting}
                        >
                            {this.props.isSubmitting ? 
                                (
                                    <Fragment>
                                        <Spinners /> <span>PROCESSING...</span>
                                    </Fragment>
                                ) : 'PLACE ORDER'
                            }
                        </button>
                    </div>
                </div>
                <div className="mt-3">
                    <AlertMessage 
                        variant="dark" 
                        dismissible={false}
                    >
                        <p style={{fontSize: '12px', marginBottom: '0px'}}>After clicking the “Place Order” button, you will be redirected to sign a document with your mouse or smartphone. If you don’t sign now, you will need to return to “My Account” and sign the document before Property Tax Lock can protest your property taxes.</p>
                    </AlertMessage>
                </div>
                
                    
                {this.state.Loading && (
                    <div 
                        className="position-absolute" 
                        style={loadingContainer}
                    >
                        <Spinners />
                    </div>
                )}
            </div>
        );
    }
}

export default OrderPayment;