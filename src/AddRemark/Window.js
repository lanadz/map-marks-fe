import React, { Component } from 'react';
import './Window.sass';

class Window extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(e) {
    this.setState({ body: e.target.value });
  }

  submit() {
    let { body } = this.state;

    if (body.length > 0) {
      this.props.onSubmit(this.state.body);
      this.props.onClose();
      this.setState({ body: "" });
    }
  }

  render() {
    return (
      <div className={`container add-remark-dialog ${this.props.active}`}>
        <div className="delete" onClick={this.props.onClose}></div>
        <div><strong>{this.props.username} says:</strong></div>
        <form className="form">
          <div className="field textarea-wrapper">
            <div className="control">
              <textarea className="textarea has-fixed-size"
                name="body"
                value={this.state.body}
                onChange={this.handleChange}
                placeholder="Say something about this place.."
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button type="button" onClick={this.submit} className="button is-primary is-fullwidth">Submit</button>
            </div>
          </div>

        </form>
      </div>
    );
  }
}

export default Window;