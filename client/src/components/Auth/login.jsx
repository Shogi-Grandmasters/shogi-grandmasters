import React, { Component } from 'react'
import axios from 'axios'

class Login extends Component {

  submitAuthData = (e) => {
    e.preventDefault();
    const { email, password, username } = this.state;
    const body = {
      email,
      password
    }
    console.log(body)
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return(
      <div>
        <form>
          <input
            name='email'
            type='text'
            placeholder={'enter email'}
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
            onClick={(e) => this.submitAuthData(e)}
            />
        </form>
      </div>
    )
  }
}

export default Login;