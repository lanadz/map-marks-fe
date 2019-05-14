import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Window.sass';

class Window extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    active: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    active: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      body: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(e) {
    this.setState({ body: e.target.value });
  }

  submit() {
    const { body } = this.state;
    const { onSubmit, onClose } = this.props;
    if (body.length > 0) {
      onSubmit(body);
      onClose();
      this.setState({ body: '' });
    }
  }

  render() {
    const { username, onClose, active } = this.props;
    const { body } = this.state;

    return (
      <div className={`container add-remark-dialog ${active}`}>
        <div className="delete" onClick={onClose} />
        <div>
          <strong>
            {username}
            {' '}
says:
          </strong>
        </div>
        <form className="form">
          <div className="field textarea-wrapper">
            <div className="control">
              <textarea
                className="textarea has-fixed-size"
                name="body"
                value={body}
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
