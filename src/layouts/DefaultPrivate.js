import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import "../shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";

const DefaultPrivateLayout = ({ children, noNavbar, noFooter }) => (
  <div>
    <Container fluid>
      <Row>
        <MainSidebar />
        <Col
          className="main-content p-0"
          lg={{ size: 10, offset: 2 }}
          md={{ size: 9, offset: 3 }}
          sm="12"
          tag="main"
        >
          {!noNavbar && <MainNavbar />}
          {children}
          {!noFooter && <MainFooter />}
        </Col>
      </Row>
    </Container>
  </div>

);

DefaultPrivateLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

DefaultPrivateLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default DefaultPrivateLayout;
