import './ListRemarks.sass';
import React from 'react';

const Remark = (props) => {
  return (
    <div className="remark">
    <div className="body">
      <span className="name">{props.user_name}</span>
      <span>{props.body}</span>
      <div className="date">{props.created_at}</div>
    </div>
    </div>
  );
}

const ListRemarks = (props) => {
  return (
    <div className={`container list-remarks ${props.active}`}>
      <div className="delete" onClick={props.onClose}></div>
      <div className="username"><strong>Remarks</strong></div>
      <div className="wrapper">
        {props.remarks.map((remark, index) => <Remark key={index} {...remark} />)}
      </div>
    </div>
  );
}

export default ListRemarks;