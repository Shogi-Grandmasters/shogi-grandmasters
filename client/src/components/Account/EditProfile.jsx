import React, { Component } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import "./Account.css";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  handleDrop = files => {
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "pvhilzh7"); // Replace the preset name with your own
      formData.append("api_key", "1234567"); // Replace API key with your own Cloudinary key
      formData.append("timestamp", (Date.now() / 1000) | 0);
      
      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios.post("https://api.cloudinary.com/v1_1/codeinfuse/image/upload", formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }).then(response => {
        const data = response.data;
        const fileURL = data.secure_url // You should store this URL for future references in your app
        console.log(data);
      })
    });
  
    // Once all the files are uploaded 
    axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation
    });
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