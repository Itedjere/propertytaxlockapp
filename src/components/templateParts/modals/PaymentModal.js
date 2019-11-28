import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Spinners from '../Spinners';

const PaymentModal = props => {
    return (
        <Modal
            show={props.showModal}
            onHide={() => props.closeModal()}
            size={props.paymentInProgress ? "sm" : "lg" }
            backdrop="static"
            centered
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header style={{justifyContent: 'center'}}>
                <Modal.Title id="example-custom-modal-styling-title">
                    {props.paymentInProgress ? 'Payment In Progress!!!' : null }
                    {props.paymentStatus === "Ok" ? 'Your Payment Was Successful' : null}
                    {(props.paymentStatus !== "Ok" && props.paymentStatus !== "") ? 'An Error Occurred During Your Payment' : null}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.paymentInProgress && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Spinners />
                    </div>
                )}
                {props.paymentStatus === "Ok" ? 
                    (
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Property Paid For</th>
                                    <th>Payment Status</th>
                                    <th>Amount Paid</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>{props.paymentResponse.situsAddress}</td>
                                    <td><Badge variant="success">COMPLETED</Badge></td>
                                    <td>{props.paymentResponse.amount}</td>
                                </tr>
                            </tbody>
                        </Table>
                    ) : null
                }
                {(props.paymentStatus !== "Ok" && props.paymentStatus !== "") && (
                    <p>{props.paymentStatus}</p>
                )}
            </Modal.Body>
            <Modal.Footer style={{justifyContent: 'center'}}>
                {props.paymentInProgress ? 'After Successfull Payment. You Will Sign Your Document!!!' : null}
                {props.paymentStatus === "Ok" && (
                    <a href={props.paymentResponse.signNowLink} className="btn btn-primary">
                        Click Here To Sign Your Document
                    </a>
                )}
                {(props.paymentStatus !== "Ok" && props.paymentStatus !== "") && (
                    <Button variant="primary" 
                        onClick={() => props.closeModal()}
                    >Click Here To Go Back</Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};


export default PaymentModal;