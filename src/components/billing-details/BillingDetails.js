import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem
} from "shards-react";

const BillingDetails = ({ details }) => (
  <Card small className="mb-4 pt-3">
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <img
          className="rounded-circle"
          src={require("./../../images/avatars/welcome-avatar.png")}
          alt={details.firstName}
          width="110"
        />
      </div>
      <h4 className="mb-0">{`${details.firstName} ${details.lastName}`}</h4>
      {/* <Button pill outline size="sm" className="mb-2">
        <i className="material-icons mr-1">update</i> Update
      </Button> */}
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="px-4">
        <div className="progress-wrapper">
          <strong className="text-muted d-block mb-2">
            Address
          </strong>
          <span>{details.address}</span>
        </div>
      </ListGroupItem>
      <ListGroupItem className="p-4">
        <strong className="text-muted d-block mb-2">
          Company
        </strong>
        <span>{details.company}</span>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

BillingDetails.propTypes = {
  /**
   * The user details object.
   */
  details: PropTypes.object
};

BillingDetails.defaultProps = {
  details: {
    firstName: "Sierra",
    lastName: "Brooks",
    avatar: require("./../../images/avatars/0.jpg"),
    performanceReportTitle: "Address",
    metaTitle: "City, State, Zip",
    metaValue: "Lorem ipsum dolor"
  }
};

export default BillingDetails;
