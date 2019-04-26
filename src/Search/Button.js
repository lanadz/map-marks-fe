import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <span className="icon" onClick={this.props.onClick}>
        <i className="fa fa-search fa-2x"></i>
      </span>
    );
  }
}

export default Button;