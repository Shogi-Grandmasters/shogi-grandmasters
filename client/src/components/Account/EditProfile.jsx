import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import './Account.css';

const {REST_SERVER_URL, AVATAR_UPLOAD_URL, AVATAR_URL, AVATAR_API} = process.env;

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
      formData.append('file', file);
      formData.append('upload_preset', 'pnjjwy1j'); // preset = img styling
      formData.append('api_key', AVATAR_API); // add api key
      formData.append('timestamp', (Date.now() / 1000) | 0);
      return axios.post(`${AVATAR_UPLOAD_URL}`, formData, {
         headers: { 'X-Requested-With': 'XMLHttpRequest' },
       })
      .then(response => {
        const data = response.data;
        const fileURL = data.secure_url // full URL
        const img = fileURL.split('upload/').slice(1)
        localStorage.setItem('avi', img);
        axios.put(`${REST_SERVER_URL}/api/users/${localStorage.id}/${img}`)
          .then(res => this.props.history.push('/acct/edit'))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
    });
  }

  submitPasswordReset = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${REST_SERVER_URL}/api/auth/reset`, this.state, {
        headers: { 'Content-Type': 'application/json' }
      });
      localStorage.setItem('token', data[0].token.accessToken);
      data ? alert('Password changed successfully') : alert('Password change failed!!!');
    } catch (err) {
      alert('Password change failed!!!');
    }
  }

  render() {
    const avi = localStorage.avi ? <img width="100px" src={`${AVATAR_URL}${localStorage.avi}`} /> : <img width="50px" src={`${AVATAR_URL}v1521760976/mi69trcbxaq3ubkq4yh4.png`} />
    return (
      <div className="edit-container">
      <div className="title">Welcome back {localStorage.username}-san!</div>
        <div className="edit-avatar-container">
          <h3 className="title">Edit your Avatar:</h3>
          <div className="edit-dropzone">
          {avi}
          <Dropzone
            onDrop={this.handleDrop}
            multiple
            accept="image/*"
            style={{"width" : "100px", "height" : "100px", "border" : "1px solid black", "borderRadius" : "5px"}}
            >
            <p style={{"textAlign" : "center"}}>Drop here</p>
          </Dropzone><br />
        </div>
      </div>
        <form className="edit-form-container">
          <h3 className="title">Change your password:</h3>
          <input
            name="username"
            type="text"
            autoComplete="username"
            className="edit-form"
            placeholder={"enter your username"}
            onChange={this.handleInputChange}
            />
          <input
            name="password"
            type="password"
            className="edit-form"
            autoComplete="current-password"
            placeholder={"enter your old password"}
            onChange={this.handleInputChange}
            /><br />
          <input
            name="new_password"
            type="password"
            autoComplete="new-password"
            placeholder={"enter your new password"}
            className="edit-form"
            onChange={this.handleInputChange}
            />
          <button
            type="submit"
            className="auth-button"
            onClick={(e) => this.submitPasswordReset(e)}
            >Submit</button>
        </form>
      </div>
    )
  }
}

export default EditProfile;
