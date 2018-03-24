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
      
      return axios.post("https://api.cloudinary.com/v1_1/shogigrandmasters/image/upload", formData)
      .then(response => {
        const data = response.data;
        const fileURL = data.secure_url // full URL
        const img = fileURL.split("upload/").slice(1)
        localStorage.setItem("avi", img);
        axios.put(`http://localhost:3396/api/users/${localStorage.id}/${img}`)
        .then(res => this.props.history.push("/acct"))
        
        //example url
        //https://res.cloudinary.com/shogigrandmasters/image/upload/v1521764336/t8e4tdezb32n1rq3il9h.png
      })
    });
  }

  render() {
    const avi = localStorage.avi ? <img width="50px" src={`https://res.cloudinary.com/shogigrandmasters/image/upload/${localStorage.avi}`} /> : <img width="50px" src="http://res.cloudinary.com/shogigrandmasters/image/upload/v1521760976/mi69trcbxaq3ubkq4yh4.png" />
    return (
      <div className="edit-container">
        <h2 className="title">Welcome back {localStorage.username}-san!</h2>
        <form className="edit-form-container">
          <h3 className="title">Reset your password:</h3>
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
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder={"enter your new password"}
            className="edit-form"
            onChange={this.handleInputChange}
            />
          <input
            type="submit"
            className="auth-button"
            onClick={(e) => this.submitAuthData(e)}
            />
        </form>
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