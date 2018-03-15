import React, { Component } from 'react'
import axios from 'axios'

class Login extends Component {

  submitAuthData = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const body = { username, password }
    try {
      const data = await axios.post(`http://localhost:3396/api/auth/login`, body);
      localStorage.setItem('username', data.data.username)
      localStorage.setItem('id', data.data.id)
      localStorage.setItem('token', data.data.token.accessToken)
      data ? this.props.history.push('/') : this.props.history.push('/login');
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
      <div>
        <form>
          <input
            name='username'
            type='text'
            placeholder={'enter username'}
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