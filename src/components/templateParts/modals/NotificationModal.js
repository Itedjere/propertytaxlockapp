import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Spinners from '../Spinners';

const NotificationModal = props => {
    return (
        <Modal
            show={props.showModal}
            onHide={() => props.closeModal()}
            size={props.propertyFound ? 'lg' : 'sm'}
            backdrop="static"
            centered
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title" style={{textAlign: 'center'}}>
                    {props.searchingProperties && 'Please Wait While We Search For Your Property'}
                    {(props.propertyFound && !props.searchingProperties) && 'Please Select Your Property'}
                    {(!props.propertyFound && !props.searchingProperties) && 'No Property Was Found'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.searchingProperties && (
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Spinners />
                    </div>
                )}
                {(props.propertyFound && !props.searchingProperties) ? 
                    (
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Owner Name</th>
                                    <th>Owner Address</th>
                                    <th>Owner City/State</th>
                                    <th>Owner Zip</th>
                                    <th>Property Address</th>
                                    <th>Is This Your Property</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.properties.map((property, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{property.Owner_Name}</td>
                                        <td>{property.Owner_Address}</td>
                                        <td>{property.Owner_CityState}</td>
                                        <td>{property.Owner_Zip}</td>
                                        <td>{property.Situs_Address}</td>
                                        <td>
                                            <ButtonToolbar className="justify-content-center">
                                                <Button 
                                                    onClick={() => props.propertySelected(property)}
                                                    variant="outline-primary">Yes</Button>
                                            </ButtonToolbar>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : null
                }
                {(!props.propertyFound && !props.searchingProperties) && (
                    <p>Sorry We Did Not Find Your Property. Please Contact Us On 817-757-0086 So That We Can Help You.</p>
                )}
            </Modal.Body>
        </Modal>
    );
};

// NotificationModal.propTypes = {
    
// };

export default NotificationModal;