import React from "react";
import { Link } from "react-router-dom";
import { CustomerContext } from "../../../../contexts/PDProvider";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem
} from "shards-react";

export default class UserActions extends React.Component {
  static contextType = CustomerContext;

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      UserName: "Welcome"
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    const UserName = Object.keys(this.context.customer).length > 0 ? this.context.customer.first_name : this.state.UserName;

    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/avatars/welcome-avatar.png")}
            alt="Welcome Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">{UserName}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <Link className="dropdown-item" tabIndex="0" to="/user-profile-lite">
            <i className="material-icons">&#xE7FD;</i> Account Details
          </Link>
          <Link className="dropdown-item" tabIndex="0" to="/billing-details">
            <i className="material-icons">&#xE8B8;</i> Billing Details
          </Link>
          <Link className="dropdown-item" tabIndex="0" to="/upload-documents">
            <i className="material-icons">&#xE2C7;</i> Upload Documents
          </Link>
          <Link className="dropdown-item" tabIndex="0" to="/change-password">
            <i className="material-icons">&#xE896;</i> Change Password
          </Link>
          <DropdownItem divider />
          <Link className="dropdown-item text-danger" tabIndex="0" to="/logout">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </Link>
        </Collapse>
      </NavItem>
    );
  }
}
