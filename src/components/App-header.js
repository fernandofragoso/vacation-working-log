import React, { Component } from 'react';
import './App-header.css';

export default class AppHeader extends Component {

  constructor() {
    super();
    this.state = {
      isShowingLogin: false
    }
    let _user = "";
    let _password = "";
  }

  render() {
    let login = <button className="login__input" onClick={this._showLogin.bind(this)}>Login</button>

    if (this.props.isLogged) {
      login = <button className="login__input" onClick={this._logout.bind(this)}>Logout</button>
    }

    if (this.state.isShowingLogin) {
      login = <div className="login__form">
        <input
          className="login__input"
          placeholder="User"
          ref={c => { this._user = c }} />
        <input
          className="login__input"
          type="password"
          placeholder="Password"
          ref={c => { this._password = c }} />
        <button className="login__input" onClick={this._login.bind(this)}>Ok</button>
        <button className="login__input" onClick={this._showLogin.bind(this)}>Cancel</button>
      </div>
    }

    return (
      <header className="App-header">
        <h2 className="App-title">vacation-working-log</h2>
        <div>{login}</div>
      </header>
    );
  }

  _showLogin() {
    this.setState({
      isShowingLogin: !this.state.isShowingLogin
    });
  }

  _login() {
    this.props.onLogin(this._user.value, this._password.value);
    this._showLogin();
  }

  _logout() {
    this.props.onLogout();
  }

}