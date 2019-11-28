import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Moment from 'react-moment';
import { 
  Alert, 
  Badge, 
  Container, 
  Row, 
  Col, 
  Card, 
  CardHeader, 
  CardBody, 
  Modal, 
  ModalBody, 
  ModalHeader,
  Button } from "shards-react";

import { CustomerContext } from "../contexts/PDProvider";
import PageTitle from "../components/common/PageTitle";

class AccountOrders extends React.Component {
  static contextType = CustomerContext;

  constructor(props) {
    super(props);
    this.state = {
      baseUrl: process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_SERVER_SANDBOX_URL : process.env.REACT_APP_SERVER_PRODUCTION_URL,
      userId: null,
      lineItems: [],
      orders: [],
      modalOpened: false,
      errorModalOpened: false,
      errorModalMsg: 'Sorry A Server Error Occured. Logout And Login Again If Error Persists',
      currency: 'USD',
    };

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.toggleErrorModal = this.toggleErrorModal.bind(this);
  }

  componentDidMount() {
    
    const appCredentials = JSON.parse(localStorage.getItem("appState"));
    if (appCredentials) {
      const customerId = appCredentials.customerId;
      const jwt = appCredentials.jwt;
      
      if (this.context.orders.length > 0) {
        this.setInitialState(this.context.orders);
      } else {
        axios.post(`${this.state.baseUrl}/woocommerce/GetOrders.php`, {
          customerId,
          jwt,
        })
        .then(response => {
          // console.log(response.data);
          // populate the state
          if (response.data.code === undefined) {
            // Set Orders Context
            this.context.setOrder(response.data);
            this.setInitialState(response.data);
            // console.log(this.state);
          } else {
            // show an modal box
            let errorPayload = { 
              code: response.data.code, 
              message: response.data.message
            };
            console.log(errorPayload);
            // Woocommerce Or JWT Error
            this.setState({
              errorModalOpened: true
            })
          }
        })
        .catch(error => {
          console.log(error);
        });
      }
    }
  }

  setInitialState = (response) => {
    this.setState({
      orders: response,
      currency: response[0]["currency"]
    });
  }

  openModal(orderId) {
    // console.log(orderId);
    // Look For The Object With this array
    let order = this.state.orders.find(order => order.id === orderId);
    this.setState({
      lineItems: order.line_items,
      modalOpened: true,
    });
  }

  closeModal() {
    this.setState(prevState => ({
      modalOpened: !prevState.modalOpened,
      lineItems: [],
    }))
  }

  toggleErrorModal() {
    this.setState({ errorModalOpened: false })
  }

  render() {
    const { orders, lineItems, currency } = this.state;
    // console.log(lineItems);
    
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="My Orders" subtitle="Account" className="text-sm-left" />
        </Row>

        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">My Orders</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                {orders.length > 0 ? 
                  (
                      <Table bordered hover responsive>
                        <thead className="bg-light">
                          <tr>
                            <th scope="col" className="border-0">
                              Transaction ID
                            </th>
                            <th scope="col" className="border-0">
                              Status
                            </th>
                            <th scope="col" className="border-0">
                              Date
                            </th>
                            <th scope="col" className="border-0">
                              Discount
                            </th>
                            <th scope="col" className="border-0">
                              Total
                            </th>
                            <th scope="col" className="border-0">
                              Payment Method
                            </th>
                            <th scope="col" className="border-0">
                              Details
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map(order => (
                            <tr key={order.id}>
                              <td>{ order.transaction_id }</td>
                              <td>
                                <Badge theme="success">
                                  { order.status }
                                </Badge>
                              </td>
                              <td>
                                <Moment format="YYYY/MM/DD">
                                  {order.date_paid}
                                </Moment>
                              </td>
                              <td>{`${order.currency} ${order.discount_total}`}</td>
                              <td>{ `${order.currency} ${order.total}` }</td>
                              <td>{ order.payment_method_title }</td>
                              <td>
                                <Button theme="primary" onClick={() => this.openModal(order.id)}>See Details</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                  )
                  :
                  (
                    <Alert theme="info">You Do Not Have Any Order Yet</Alert>
                  )
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal 
          size="lg" 
          open={this.state.modalOpened} 
          toggle={this.closeModal}
        >
          <ModalHeader>List Of Products</ModalHeader>
          <ModalBody>
            <Table bordered hover responsive>
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    Name
                  </th>
                  <th scope="col" className="border-0">
                    Quantity
                  </th>
                  <th scope="col" className="border-0">
                    Price
                  </th>
                  <th scope="col" className="border-0">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {lineItems.map(item => (
                  <tr key={item.id}>
                    <td>{ item.name }</td>
                    <td>
                      <Badge theme="success">
                        { item.quantity }
                      </Badge>
                    </td>
                    <td>{ `${currency} ${item.price}` }</td>
                    <td>{ `${currency} ${item.total}` }</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ModalBody>
        </Modal>
        <Modal centered open={this.state.errorModalOpened} toggle={this.toggleErrorModal}>
          <ModalHeader>Error</ModalHeader>
          <ModalBody>
            <p>{this.state.errorModalMsg}</p>
            <Link to="/logout" className="btn btn-primary">Logout</Link>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

export default AccountOrders;
