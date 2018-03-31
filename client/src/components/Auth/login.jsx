import React, { Component } from "react";
import axios from "axios";
import Logo from "../Global/Logo/index.js"
import "./Auth.css";

const {REST_SERVER_URL} = process.env;

class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }

  submitAuthData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${REST_SERVER_URL}/api/auth/login`, this.state);
      localStorage.setItem('email', data.email);
      localStorage.setItem('username', data.username);
      localStorage.setItem('id', data.id);
      localStorage.setItem('token', data.token.accessToken);
      localStorage.setItem('unrankedRating', data.rating_unranked);
      localStorage.setItem('rankedRating', data.rating_ranked);
      if(data.avatar != null){localStorage.setItem('avi', data.avatar)}
      data.email ? this.props.history.push('/home') : this.props.history.push('/login');
    } catch (err) {
      alert("Invalid login attempt")
    }
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return(
      <div className="auth-container">
        <br/>
        <Logo /><br />
        <form className="auth-form-container">
          <input
            name="username"
            type="text"
            autoComplete="username"
            placeholder={"enter username"}
            className="auth-form"
            onChange={this.handleInputChange}
            /><br />
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder={"enter your password"}
            className="auth-form"
            onChange={this.handleInputChange}
            /><br />
          <input
            type="submit"
            value="Login"
            className="auth-button"
            onClick={(e) => this.submitAuthData(e)}
            /><br />
        </form>
        <input
            type="submit"
            value="Signup"
            className="auth-button"
            onClick={() => this.props.history.push("/signup")}
            />
      </div>
    )
  }
}

export default Login;
