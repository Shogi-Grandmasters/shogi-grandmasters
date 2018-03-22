import React, { Component } from 'react';
import axios from 'axios';
import Logo from '../Global/Logo/index.js';
import Nav from '../Global/Nav/Nav.jsx';
import Friends from '../Friends/index.jsx';
import { Link, Switch, Route } from "react-router-dom";
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
        <Link to="/acct/friends">Friends</Link>
        <Link to="/acct/edit">Edit</Link>
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
  