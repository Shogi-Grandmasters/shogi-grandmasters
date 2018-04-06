import React, { Component } from 'react';
import { HalfLockup } from '../Logo';
import { Link } from 'react-router-dom';

import './Nav.css'

const {AVATAR_URL} = process.env;
class Nav extends Component {
  constructor() {
    super();
    this.state = {
      username: localStorage.username,
    };
  }

  logout = () => {
    localStorage.clear();
    this.props.socket && this.props.socket.close();
  }

  render() {
    const avi = localStorage.avi ? <img width="50px" className="avi" src={`${AVATAR_URL}${localStorage.avi}`} /> : <img width="50px" className="avi" src="http://res.cloudinary.com/shogigrandmasters/image/upload/v1521760976/mi69trcbxaq3ubkq4yh4.png" />
    return (
      <ul className="topnav">
        <li className="logo"><Link to="/home"><HalfLockup palette={{ gg: '#FFF', text: '#FFF', glyph: '#f15a4a' }}/></Link></li>
        <li className="nav"><Link to="/login" onClick={()=>this.logout()}>Logout</Link></li>
        <li className="nav"><Link to="/acct/history">Match History</Link></li>
        <li className="nav"><Link to="/acct" onClick={()=>this.props.socket.close()}>{localStorage.username}</Link></li>
        {avi}
      </ul>
    )
  }
}

export default Nav;
