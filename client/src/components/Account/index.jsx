import React, { Component } from 'react';
import axios from 'axios';
import Logo from '../Global/Logo/index.js';
import Nav from '../Global/Nav/Nav.jsx';
import Friends from '../Friends/index.jsx';
import { Link, Switch, Route, Redirect } from "react-router-dom";
import EditProfile from "./EditProfile.jsx";

class Account extends Component {
  constructor() {
    super();
    this.state = {};
  }


  render() {
    return(
      <div>
        <Nav />
        <ul>
          <li><Link to="/acct/friends">Friends</Link></li>
          <li><Link to="/acct/edit">Edit</Link></li>
          <li>Leader</li>
          <li>Account Info</li>
        </ul>
        <Switch>
          <Route path="/acct/friends" component={Friends} />
          <Route path="/acct/edit" component={EditProfile} />
          <Redirect from="/acct/" to="/acct/friends" />
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
