import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RemarkMarker from './RemarkMarker';

class RemarkMarkerButton extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    groupId: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onClick, groupId } = this.props;

    onClick(groupId);
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <RemarkMarker {...this.props} />
      </div>
    );
  }
}

export default RemarkMarkerButton;
