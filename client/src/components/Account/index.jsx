import React, { Component } from 'react';
import axios from 'axios';
import Logo from '../Global/Logo/index.js';
import Nav from '../Global/Nav/Nav.jsx';
import Friends from '../Friends/index.jsx';
import { Link, Switch, Route, Redirect } from "react-router-dom";
import EditProfile from "./EditProfile.jsx";

import './Account.css';

class Account extends Component {
  constructor() {
    super();
    this.state = {};
  }

  

  render() {
    return(
      <div>
        <Nav />
        <br />
        <ul className="vert-container">
          <li className="vert-nav"><Link to="/acct/friends">Friends</Link></li>
          <li className="vert-nav"><Link to="/acct/edit">Edit</Link></li>
          <li className="vert-nav"><a>Leader</a></li>
          <li className="vert-nav"><a>Account Info</a></li>
        </ul>
        <Switch>
          <Route path="/acct/friends" component={Friends} /> 
          <Route path="/acct/edit" component={EditProfile} />
        </Switch> 
      </div>
    )
  }
}

export default Account

//<Friends />
// <Switch>
//  <Route to="/acct/edit"> Edit Profile </Route>
// </Switch>
//          <Redirect from="/acct/" to="/acct/friends" />

  