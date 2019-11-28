import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { CustomerContext } from "../../../../contexts/PDProvider";
import axios from "axios";
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";
// import Spinners from '../../../templateParts/Spinners';

export default class Notifications extends Component {
  static contextType = CustomerContext;
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      videoNotificationUrl: '/instructional-videos',
      surveyNotificationUrl: '/survey',
      signNowNotificationUrl: '/signnow',
      videoid: 1,
      goToNotification: false,
      goToNotificationUrl: '/instructional-videos',
      notifications: [],
    };

    this.toggleNotifications = this.toggleNotifications.bind(this);
  }

  componentDidMount() {
    const appCredentials = JSON.parse(localStorage.getItem("appState"));
    const notifications = appCredentials ? appCredentials.notifications : this.context.notifications;

    this.setState({
      notifications: notifications === undefined ? [] : notifications,
    })
    // console.log(notifications);
  }

  toggleNotifications() {
    this.setState({
      visible: !this.state.visible
    });
  }

  handleNotification = (notificationid, goToNotificationUrl) => {
    // Send A Post To The Server And Update Notification Table
    const appCredentials = JSON.parse(localStorage.getItem("appState"));
    if (appCredentials) {
      const jwt = appCredentials.jwt;
      const customerId = appCredentials.customerId;

      const formData = new FormData();
      formData.append("jwt", jwt);
      formData.append("notificationid", notificationid);
      formData.append("customerId", customerId);

      axios.post(`${this.context.baseUrl}/notification/UpdateNotifications.php`, formData)
      .then(response => {
        // console.log(response.data);
        if (response.data.code === undefined) {
          const newAppCredentials = { ...appCredentials, notifications: response.data.notifications, };
          // Remove The Old LocalStorage
          localStorage.removeItem("appState");
          // Add new local storage
          localStorage.setItem("appState", JSON.stringify(newAppCredentials));
          // Store Notifications In Context
          this.context.setNotifications(response.data.notifications);
          // Send User To Notification
          this.setState({ 
            goToNotification: true, 
            goToNotificationUrl,
            notifications: response.data.notifications,
          });
          console.log(newAppCredentials);
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

  render() {
    return (
      <Fragment>
        <NavItem className="border-right dropdown notifications">
          <NavLink
            className="nav-link-icon text-center"
            onClick={this.state.notifications.length === 0 ? () => {} : this.toggleNotifications}
          >
            <div className="nav-link-icon__wrapper">
              <i className="material-icons">&#xE7F4;</i>
              <Badge pill theme="danger">
                {this.state.notifications.length}
              </Badge>
            </div>
          </NavLink>
          {
            this.state.notifications.length > 0 &&
            (
              <Collapse
                open={this.state.visible}
                className="dropdown-menu dropdown-menu-small"
              >
                {
                  this.state.notifications.map((notification, index) => {
                    let notificationIcon = "";
                    let notificationUrl = "";

                    switch (notification.nt_type) {
                      case "signnow":
                        notificationIcon = "insert_drive_file";
                        notificationUrl = this.state.signNowNotificationUrl;
                        break;
                      case "video":
                        notificationIcon = "play_circle_outline";
                        notificationUrl = this.state.videoNotificationUrl;
                        break;
                      case "survey":
                        notificationIcon = "home_work";
                        notificationUrl = this.state.surveyNotificationUrl;
                        break;
                      default:
                        notificationIcon = "play_circle_outline";
                        notificationUrl = this.state.videoNotificationUrl;
                    }

                    return (
                      <DropdownItem
                        key={index}
                        onClick={() => this.handleNotification(notification.nt_id, notificationUrl)}
                      >
                        <div className="notification__icon-wrapper">
                          <div className="notification__icon">
                            <i className="material-icons">{notificationIcon}</i>
                          </div>
                        </div>
                        <div className="notification__content">
                          <span className="notification__category">IMPORTANT!!! PLEASE ATTEND TO THIS</span>
                          <p>
                            {notification.nt_title}
                          </p>
                        </div>
                      </DropdownItem>
                    )
                  })
                }
                {/* <DropdownItem className="notification__all text-center">
                    View all Notifications
                  </DropdownItem> */}
              </Collapse>
            )
          }
        </NavItem>
        {(this.state.goToNotification && this.state.notifications.length > 0) && <Redirect to={`${this.state.goToNotificationUrl}`} /> }
      </Fragment>
    );
  }
}
