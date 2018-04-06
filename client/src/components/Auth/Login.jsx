import React, { Component } from "react";
import axios from "axios";
import { HalfLockup } from "../Global/Logo/index.js"
import { FadeIn } from '../Global/Animation/Transitions.jsx';
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
      const { data } = await axios.post(`${REST_SERVER_URL}/api/auth/login`, this.state, {
        headers: { 'Content-Type': 'application/json' }
      });
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
      <div className="auth__page">
        <FadeIn>
          <div className="auth__page-container">
            <div className="logo__container">
              <HalfLockup />
            </div>
            <form className="auth__form-container">
              <input
                name="username"
                type="text"
                autoComplete="username"
                placeholder={"ENTER YOUR USERNAME"}
                className="auth__form-input"
                onChange={this.handleInputChange}
                />
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder={"ENTER YOUR PASSWORD"}
                className="auth__form-input"
                onChange={this.handleInputChange}
                />
              <button
                type="submit"
                className="auth__button"
                onClick={(e) => this.submitAuthData(e)}
              >Login</button>
            </form>
            <div className="landing__signup-cta">
              <em>Need an account?</em> <a className="landing__link-secondary" onClick={() => this.props.history.push("/signup")}>Sign Up</a>
            </div>
          </div>
        </FadeIn>
      </div>
    )
  }
}

export default Login;
