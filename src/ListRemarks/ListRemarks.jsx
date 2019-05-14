import './ListRemarks.sass';
import React from 'react';
import PropTypes from 'prop-types';

const Remark = ({ user_name: userName, body, created_at: createdAt }) => (
  <div className="remark">
    <div className="body">
      <span className="name">{userName}</span>
      <span>{body}</span>
      <div className="date">{createdAt}</div>
    </div>
  </div>
);

Remark.propTypes = {
  user_name: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
};

const ListRemarks = ({ active, onClose, remarks }) => (
  <div className={`container list-remarks ${active}`}>
    <div className="delete" onClick={onClose} />
    <div className="username"><strong>Remarks</strong></div>
    <div className="wrapper">
      {remarks.map(remark => <Remark key={remark.id} {...remark} />)}
    </div>
  </div>
);

ListRemarks.propTypes = {
  active: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  remarks: PropTypes.array,
};

ListRemarks.defaultProps = {
  remarks: [],
};

export default ListRemarks;
