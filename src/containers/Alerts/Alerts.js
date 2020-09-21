import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from 'react-redux';

class Alerts extends Component {
  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      console.log(error)
      if (error.msg.email) alert.error(`Email: ${error.msg.email}`);
      if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors);
      if (error.msg.username) alert.error(`Username: ${error.msg.username}`);
      if (error.msg.password) alert.error(`Password: ${error.msg.password}`);
      if (error.msg.text) alert.error(`Comment: ${error.msg.text}`);
      if (error.msg.passwordNotMatch) alert.error(error.msg.passwordNotMatch);
      if (error.msg.detail) alert.error(`${error.msg.detail}`);
    }

    if (message !== prevProps.message) {
      if (message.loginSuccess) alert.success(message.loginSuccess)
      if (message.logoutSuccess) alert.success(message.logoutSuccess)
      if (message.registerSuccess) alert.success(message.registerSuccess)
      if (message.commentAddedSuccess) alert.success(message.commentAddedSuccess)
      // Just for production
      if (message.loadedUserSuccess) alert.success(message.loadedUserSuccess)
    }
  }

  render() {
    return <Fragment />;
  }
}
const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));