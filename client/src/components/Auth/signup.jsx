import React, { Component } from 'react'
import axios from 'axios'

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      username: ''
    }
  }

  // submitAuthData = async (e) => {
  //   e.preventDefault();
  //   const { email, password, username } = this.state;
  //   const body = {
  //     email,
  //     password,
  //     username
  //   }
  //   try {
  //     const data = await axios.post(`http://localhost:3396/api/auth/signup`, body);
  //     data ? this.props.history.push('/login') : this.props.history.push('/auth');
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <form>
          <input
            name='email'
            type='text'
            placeholder={'enter email'}
            onChange={this.handleInputChange}
            />
          <input 
            name='username'
            type='text'
            placeholder={'enter your username'}
            onChange={this.handleInputChange}
            />
          <input 
            name='password'
            type='text'
            placeholder={'enter your password'}
            onChange={this.handleInputChange}
            />
          <input
            type='submit'
            onClick={(e) => console.log('hello')}
            />
        </form>
      </div>
    )
  }
}

export default Signup;