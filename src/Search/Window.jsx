import React, { Component } from 'react';
import './Window.sass';

const Remark = props => (
  <div className="remark">
    <div className="distance">
      <span className="icon">
        <i className="fa fa-map-marker" />
      </span>
      <br />
      {props.distance}
m
    </div>

    <div className="body">
      <span className="name">{props.user_name}</span>
      <span>{props.body}</span>
      <div className="date">{props.created_at}</div>
    </div>
  </div>
);

class SearchWindow extends Component {
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
    const { query } = this.state;
    this.props.onSubmit(query);
  }

  render() {
    return (
      <div className={`container search ${this.props.active}`}>
        <div className="delete" onClick={this.props.onClose} />

        <form className="form">
          <div className="field has-addons is-fullwidth">
            <div className="control has-icons-left">
              <input
                className="input"
                name="searchQuery"
                type="text"
                value={this.state.query}
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
          {this.props.remarks.map((remark, index) => <Remark key={index} {...remark} />)}
        </div>
      </div>
    );
  }
}

export default SearchWindow;
