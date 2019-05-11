import React, { Component } from 'react';
import './Login.sass';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state;
    if (name.length > 0) {
      this.props.onLogin({ user: { name } });
    }
  }

  render() {
    return (
      <section className="section login">
        <div>
          <div className="logo-content">
            <img alt="logo" className="logo" src={`${process.env.PUBLIC_URL}/logo_title.svg`} />
          </div>

          <div className="form">
            <form action="">
              <div className="field">
                <div className="control has-icons-left">
                  <input
                    className="input"
                    name="username"
                    type="text"
                    value={this.state.userName}
                    onChange={this.handleChange}
                    placeholder="Jane Doe"
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-user" />
                  </span>
                </div>
              </div>

              <div className="field">
                <p className="control">
                  <button
                    type="submit"
                    className="button is-primary is-fullwidth"
                    onClick={this.handleSubmit}
                  >
                    Enter
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>

      </section>
    );
  }
}

export default Login;
