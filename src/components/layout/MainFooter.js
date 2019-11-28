import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Nav, NavItem } from "shards-react";
import { Link } from "react-router-dom";

const MainFooter = ({ contained, menuItems, copyright }) => (
  <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
    <Container fluid={contained}>
      <Row>
        <Nav>
          {menuItems.map((item, idx) => (
            <NavItem key={idx}>
              <Link to={item.to}>
                {item.title}
              </Link>
            </NavItem>
          ))}
        </Nav>
        <span className="copyright ml-auto my-auto mr-2">{copyright}</span>
      </Row>
    </Container>
  </footer>
);

MainFooter.propTypes = {
  /**
   * Whether the content is contained, or not.
   */
  contained: PropTypes.bool,
  /**
   * The menu items array.
   */
  menuItems: PropTypes.array,
  /**
   * The copyright info.
   */
  copyright: PropTypes.string
};

MainFooter.defaultProps = {
  contained: false,
  copyright: "Copyright © 2019 PropertyTaxLock",
  menuItems: [
    {
      title: "Instructional Videos",
      to: "/instructional-videos"
    },
    {
      title: "Upload Documents",
      to: "/upload-documents"
    },
    {
      title: "View Documents",
      to: "/view-documents"
    },
    {
      title: "Logout",
      to: "/logout"
    },
  ]
};

export default MainFooter;
