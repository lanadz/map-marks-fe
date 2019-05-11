import React from 'react';
import PropTypes from 'prop-types';

const MyRemarksButton = ({ onClick }) => (
  <span className="icon" onClick={onClick}>
    <i className="fa fa-id-card fa-2x" />
  </span>
);

MyRemarksButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MyRemarksButton;
