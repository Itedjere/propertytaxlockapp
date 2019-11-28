import React from 'react';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

const RedirectionModal = props => {
    return (
        <Modal
            show={props.showModal}
            size="lg"
            backdrop="static"
            centered
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header style={{justifyContent: 'center'}}>
                <Modal.Title id="example-custom-modal-styling-title">
                    {props.modalTitle}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAlign: 'center'}}>
                <p>{props.modalBody}</p>
                <p>
                    <Link className="btn btn-primary" to={props.modalDestination}>
                        {props.modalActionText}
                    </Link>
                </p>
            </Modal.Body>
        </Modal>
    );
};


export default RedirectionModal;