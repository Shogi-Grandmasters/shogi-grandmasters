import React, { Component } from 'react';
import axios from 'axios';
import Logo from '../Global/Logo/index.js';
import Nav from '../Global/Nav/Nav.jsx';
import Friends from '../Friends/index.jsx';

class Account extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return(
      <div>
        <Nav />
        <Friends />
      </div>
    )
  }
}

export default Account