import React, { Component } from 'react';
import axios from 'axios';

import './Auth.css';

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
      const data = await axios.post(`http://localhost:3396/api/auth/signup`, body);
      data ? this.props.history.push('/login') : this.props.history.push('/auth');
    } catch (err) {
      throw new Error(err);
    }
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className='auth-container'>
        <input
          name='email'
          type='text'
          className='auth-form'
          placeholder={'enter email'}
          onChange={this.handleInputChange}
          />
        <input 
          name='username'
          type='text'
          className='auth-form'
          placeholder={'enter your username'}
          onChange={this.handleInputChange}
          />
        <input 
          name='password'
          type='password'
          className='auth-form'
          id='password'
          placeholder={'enter your password'}
          onChange={this.handleInputChange}
          />
        <input
          type='submit'
          className='auth-button'
          onClick={(e) => this.submitAuthData(e)}
          />
      </div>
    )
  }
}

export default Signup;