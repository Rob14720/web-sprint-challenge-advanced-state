import React from 'react';
import { connect } from 'react-redux';

function Message(props) {
  return <div id="message">{props.successMessage}</div>;
}

const mapStateToProps = (state) => {
  return {
    successMessage: state.infoMessage
  }
}

export default connect(mapStateToProps, {})(Message)