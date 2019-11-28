import React, { Component, Fragment } from 'react';
import Table from 'react-bootstrap/Table'
import axios from 'axios';

import CouponForm from './CouponForm';

class CartSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Account_Num: '',
            LegalDescription: '',
            Situs_Address: '',
            totalPrice: '',
            subTotalPrice: '',
            productPrice: '',
            productID: '',
            productName: '',
            couponApplied: false,
            couponCode: '',
            couponDiscount: '',
            couponMessage: '',
            couponMessageIndicator: 'danger',
            isCouponMessage: false,
            baseUrl: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SERVER_PRODUCTION_URL : process.env.REACT_APP_SERVER_SANDBOX_URL,
        }
    }

    componentDidMount() {
        // check localstorage
        const propertyPresent = localStorage.getItem("chosenProperty");
    
        // If not in localStorage, show a modal for the user to go to homepage
        if (propertyPresent) {
            // Check If We Have The Searched Property In Local Storage
            const propertyDetails = JSON.parse(propertyPresent);
            const { Account_Num, Situs_Address, LegalDescription } = propertyDetails;

            // Make a call to the server to fetch the price for this property
            axios.post(`${this.state.baseUrl}/woocommerce/fetchProductPrice.php`, {
                Account_Num
            })
            .then(response => {
                // Check If Response Is Successful
                if (response.data.code === "success") {
                    const { product } = response.data;
                    // console.log(response.data);
                    // Add The Product ID To The propertyDetails In The LocalStorage
                    const propertyWithProductID = { ...propertyDetails, productID: product.id };

                    // Drop The Old propertyDetails In The LocalStorage
                    localStorage.removeItem("chosenProperty");

                    // Add The New PropertyDetails With Product ID In The LocalStorage
                    localStorage.setItem("chosenProperty", JSON.stringify(propertyWithProductID));

                    this.setState({
                        Account_Num,
                        Situs_Address,
                        LegalDescription,
                        subTotalPrice: product.price,
                        totalPrice: product.price,
                        productPrice: product.price,
                        productName: product.name,
                        productID: product.id,
                    })

                    // Set Loading To False
                    this.props.setLoading();
                    
                } else {
                    console.log(response.data.message);
                }
            })
            .catch(error => console.log(error))
        } 
    }

    validateAndApplyCouponCode = (couponCode) => {
        // Prepare Form Data
        const formData = {
            coupon_name: couponCode,
            productID: this.state.productID,
        };

        // Set Loading To True
        this.props.setLoading();

        // Make An API Call
        axios.post(`https://propertytaxlock.com/test/backend/woocommerce/FetchCoupon.php`, formData)
        .then(response => {
            if (response.data.code === "success") {
                const { couponCode, couponID, couponDiscount, totalPrice, subTotalPrice } = response.data;

                // Set Loading To False
                this.props.setLoading();

                this.setState({
                    couponApplied: true,
                    couponCode,
                    couponDiscount,
                    totalPrice,
                    subTotalPrice,
                    isCouponMessage: true,
                    couponMessage: 'Coupon code applied successfully.',
                    couponMessageIndicator: 'success',
                });

                // Set The Coupon ID In The Parent
                this.props.setCouponID(couponID);

                // Hide The Credit CArd Form If the total Price is Zero
                if (totalPrice === 0) {
                    this.props.hideCreditCardDetails();
                }

            } else {
                // Set Loading To False
                this.props.setLoading();

                this.setState({
                    isCouponMessage: true,
                    couponMessage: response.data.message,
                    couponMessageIndicator: 'danger',
                })
            }
        })
        .catch(error => console.log(error));
    }

    closeAlert = () => {
        this.setState({
            isCouponMessage: false
        })
    }

    render() {
        return (
            <Fragment>
                <div className="position-relative">
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <p>{this.state.productName}</p>
                                    <p><b>Account Number: </b> {this.state.Account_Num}</p>
                                    <p><b>Address: </b> {this.state.Situs_Address}</p>
                                    <p><b>Legal Description: </b> {this.state.LegalDescription}</p>
                                </td>
                                <td>${this.state.productPrice}</td>
                            </tr>
                            <tr>
                                <td>Subtotal</td>
                                <td>${this.state.subTotalPrice}</td>
                            </tr>
                            <tr>
                                <td>Tax</td>
                                <td>$0.00</td>
                            </tr>
                            {this.state.couponApplied && (
                                <tr>
                                    <td>Coupon: <br /> {this.state.couponCode}</td>
                                    <td>-${this.state.couponDiscount}</td>
                                </tr>
                            )}
                            <tr>
                                <td>Total</td>
                                <td>${this.state.totalPrice}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <CouponForm 
                        validateAndApplyCouponCode={this.validateAndApplyCouponCode}
                        isCouponMessage={this.state.isCouponMessage} 
                        couponMessage={this.state.couponMessage}
                        couponMessageIndicator={this.state.couponMessageIndicator}
                        closeAlert={this.closeAlert}
                    />
                </div>
            </Fragment>
        );

    }
}


export default CartSummary;