import React, { Component } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import "./Account.css";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleDrop.bind(this)
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  handleDrop = (files) => {
    const uploaders = files.map(file => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "pnjjwy1j"); // preset = img styling
      formData.append("api_key", "913846924149284"); // add api key
      formData.append("timestamp", (Date.now() / 1000) | 0);
      
      return axios.post("https://api.cloudinary.com/v1_1/shogigrandmasters/image/upload", formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }).then(response => {
        const data = response.data;
        const fileURL = data.secure_url // You should store this URL for future references in your app
        const img = fileURL.split('upload/').slice(1)
        localStorage.setItem('avi', img);
        axios.put(`http://localhost:3396/api/users/${localStorage.id}/${img}`);
        console.log('our avi update data')
        //https://res.cloudinary.com/shogigrandmasters/image/upload/v1521764336/t8e4tdezb32n1rq3il9h.png
      })
    });
  }

  render() {
    const avi = localStorage.avi ? <img width="50px" src={`https://res.cloudinary.com/shogigrandmasters/image/upload/${localStorage.avi}`} /> : <img width="50px" src="http://res.cloudinary.com/shogigrandmasters/image/upload/v1521760976/mi69trcbxaq3ubkq4yh4.png" />
    return (
      <div className='edit-container'>
        {avi}
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
        <Dropzone 
          onDrop={this.handleDrop} 
          multiple 
          accept="image/*" 
          >
          <p>Add an avatar!</p>
        </Dropzone>
      </div>
    )
  }
}

export default EditProfile;