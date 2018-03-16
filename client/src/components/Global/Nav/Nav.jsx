import React, { Component } from 'react';
import Logo from '../Logo';

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      username: localStorage.username,
    };
  }

  logout = () => {
    window.localStorage.clear();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div class="topnav">
        <a class="active" href="#home">Home</a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
      </div>
    )
  }
}

export default Nav;