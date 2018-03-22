import React, { Component } from 'react';
import Logo from '../Logo';
import { Link } from 'react-router-dom';

import './Nav.css'
class Nav extends Component {
  constructor() {
    super();
    this.state = {
      username: localStorage.username,
    };
  }

  logout = () => {
    window.localStorage.clear();
  }

  render() {
    return (
      <ul className="topnav">
        <li className="logo"><Logo /></li>
        <li className="nav"><Link to="/login" onClick={()=>this.logout()}>Logout</Link></li>
        <li className="nav"><Link to="/home">Challenge</Link></li>
        <li className="nav"><Link to="/acct">Account</Link></li>
      </ul>
    )
  }
}

export default Nav;
