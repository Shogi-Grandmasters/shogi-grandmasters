import React, { Component } from 'react';
import axios from 'axios';
import { HalfLockup } from '../Global/Logo/index.js'

import './Auth.css';

const {REST_SERVER_URL} = process.env;

class Signup extends Component {
  constructor() {
    super();
    this.state = {};
  }

  submitAuthData = async (e) => {
    e.preventDefault();
    const { email, password, username } = this.state;
    const body = { email, password, username };
    try {
      const data = await axios.post(`${REST_SERVER_URL}/api/auth/signup`, body, {
        headers: { 'Content-Type': 'application/json' }
      });
      data ? this.props.history.push('/login') : this.props.history.push('/signup');
    } catch (err) {
      alert("Invalid account info, username already exists")
    }
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="auth__container">
        <div className="logo__container">
          <HalfLockup />
        </div>
        <form className="auth__form-container">
          <input
            name='email'
            type='text'
            className='auth-form'
            placeholder={'ENTER YOUR EMAIL'}
            autoComplete='email'
            onChange={this.handleInputChange}
            />
          <input
            name='username'
            type='text'
            className='auth-form'
            autoComplete="username"
            placeholder={'ENTER YOUR USERNAME'}
            onChange={this.handleInputChange}
            />
          <input
            name='password'
            type='password'
            className='auth-form'
            autoComplete="new-password"
            placeholder={'ENTER YOUR PASSWORD'}
            onChange={this.handleInputChange}
            />
          <button
            type='submit'
            className='auth__button'
            onClick={(e) => this.submitAuthData(e)}
            >Submit</button>
        </form>
        <div className="landing__signup-cta">
          <em>Already have an account?</em> <a className="landing__link-secondary" onClick={() => this.props.history.push("/login")}>Login</a>
        </div>
      </div>
    )
  }
}

export default Signup;
