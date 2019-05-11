import React, { Component } from 'react';

class MyRemarksButton extends Component {
  render() {
    return (
      <span className="icon" onClick={this.props.onClick}>
        <i className="fa fa-id-card fa-2x" />
      </span>
    );
  }
}

export default MyRemarksButton;
