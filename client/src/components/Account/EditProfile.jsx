import React, { Component } from 'react';
import axios from 'axios';

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className='edit-container'>
        <input
          name='email'
          type='text'
          className='edit-form'
          placeholder={'enter email'}
          onChange={this.handleInputChange}
          />
        <input 
          name='username'
          type='text'
          className='edit-form'
          placeholder={'enter your username'}
          onChange={this.handleInputChange}
          />
        <input 
          name='password'
          type='password'
          className='edit-form'
          id='password'
          placeholder={'enter your password'}
          onChange={this.handleInputChange}
          /><br />
        <input
          type='submit'
          className='edit-button'
          onClick={(e) => this.submitAuthData(e)}
          />
      </div>
    )
  }
}

export default EditProfile;