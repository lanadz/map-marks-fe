import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { onClick } = props;
  return (
    <span className="icon" onClick={onClick}>
      <i className="fa fa-plus fa-2x" />
    </span>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};


export default Button;
