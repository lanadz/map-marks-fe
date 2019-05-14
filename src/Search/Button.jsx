import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => (
  <span className="icon" onClick={onClick}>
    <i className="fa fa-search fa-2x" />
  </span>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
