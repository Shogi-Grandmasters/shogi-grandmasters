import React, { Component } from 'react';
import axios from 'axios';
import { HalfLockup } from '../Global/Logo/index.js'
import { FadeIn } from '../Global/Animation/Transitions.jsx';

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
      <div className="auth__page">
        <FadeIn>
          <div className="auth__page-container">
            <div className="logo__container">
              <HalfLockup />
            </div>
            <form className="auth__form-container">
              <input
                name='email'
                type='text'
                className='auth__form-input'
                placeholder={'ENTER YOUR EMAIL'}
                autoComplete='email'
                onChange={this.handleInputChange}
                />
              <input
                name='username'
                type='text'
                className='auth__form-input'
                autoComplete="username"
                placeholder={'ENTER YOUR USERNAME'}
                onChange={this.handleInputChange}
                />
              <input
                name='password'
                type='password'
                className='auth__form-input'
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
        </FadeIn>
      </div>
    )
  }
}

export default Signup;
