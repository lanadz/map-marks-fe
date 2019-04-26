import React, { Component } from 'react';
import RemarkMarker from './RemarkMarker';

class RemarkMarkerButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.groupId);
  }

  render() {
    return (
      <div onClick={this.handleClick} >
        <RemarkMarker {...this.props} />
      </div>
    );
  }
}

export default RemarkMarkerButton;