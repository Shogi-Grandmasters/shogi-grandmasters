import React, { Component } from 'react';
import axios from 'axios';

import './Auth.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }
  
  submitAuthData = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const body = { username, password }
    try {
      const data = await axios.post(`http://localhost:3396/api/auth/login`, body);
      localStorage.setItem('username', data.data.username)
      localStorage.setItem('id', data.data.id)
      localStorage.setItem('token', data.data.token.accessToken)
      data ? this.props.history.push('/home') : this.props.history.push('/login');
    } catch (err) {
      throw new Error(err);
    }
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return(
      <div className='auth-container'>
        <input
          name='username'
          type='text'
          placeholder={'enter username'}
          className='auth-form'
          onChange={this.handleInputChange}
          /><br />   
        <input 
          name='password'
          type='password'
          placeholder={'enter your password'}
          className='auth-form'
          id='password'
          onChange={this.handleInputChange}
          /><br />
        <input
          type='submit'
          className='auth-button'
          onClick={(e) => this.submitAuthData(e)}
          />
      </div>
    )
  }
}

export default Login;