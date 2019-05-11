import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Window.sass';

const Remark = ({
  distance, body, user_name: userName, created_at: createdAt,
}) => (
  <div className="remark">
    <div className="distance">
      <span className="icon">
        <i className="fa fa-map-marker" />
      </span>
      <br />
      {distance}

    </div>

    <div className="body">
      <span className="name">{userName}</span>
      <span>{body}</span>
      <div className="date">{createdAt}</div>
    </div>
  </div>
);

Remark.propTypes = {
  distance: PropTypes.number,
  user_name: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

Remark.defaultProps = {
  distance: 0,
};

class SearchWindow extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    active: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    remarks: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { onSubmit } = this.props;
    const { query } = this.state;

    onSubmit(query);
  }

  render() {
    const { active, onClose, remarks } = this.props;
    const { query } = this.state;
    return (
      <div className={`container search ${active}`}>
        <div className="delete" onClick={onClose} />

        <form className="form">
          <div className="field has-addons is-fullwidth">
            <div className="control has-icons-left">
              <input
                className="input"
                name="searchQuery"
                type="text"
                value={query}
                onChange={this.handleChange}
                placeholder="Find remark"
              />
              <span className="icon is-small is-left">
                <i className="fa fa-search" />
              </span>
            </div>
            <div className="control">
              <button type="submit" className="button is-primary" onClick={this.handleSubmit}>Search</button>
            </div>
          </div>
        </form>

        <div className="wrapper">
          {remarks.map(remark => <Remark key={remark.id} {...remark} />)}
        </div>
      </div>
    );
  }
}

export default SearchWindow;
