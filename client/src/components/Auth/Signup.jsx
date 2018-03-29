import React, { Component } from 'react';
import axios from 'axios';
import Logo from '../Global/Logo/index.js'

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
    console.log(body);
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
      <div className='auth-container'>
        <br/>
        <Logo /><br />
        <form className="auth-form-container">
        <input
        name='email'
        type='text'
        className='auth-form'
        placeholder={'enter email'}
        autoComplete='email'
        onChange={this.handleInputChange}
        />
      <input
        name='username'
        type='text'
        className='auth-form'
        autoComplete="username"
        placeholder={'enter your username'}
        onChange={this.handleInputChange}
        />
      <input
        name='password'
        type='password'
        className='auth-form'
        autoComplete="new-password"
        placeholder={'enter your password'}
        onChange={this.handleInputChange}
        /><br />
      <input
        type='submit'
        className='auth-button'
        onClick={(e) => this.submitAuthData(e)}
        />
        </form>
      </div>
    )
  }
}

export default Signup;
