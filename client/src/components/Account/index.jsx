import React, { Component } from "react";
import axios from "axios";
import Logo from "../Global/Logo/index.js";
import Nav from "../Global/Nav/Nav.jsx";
import Friends from "../Friends/index.jsx";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import EditProfile from "./EditProfile.jsx";
import Rankings from "./Rankings.jsx";
import FrequentlyAsked from "./FrequentlyAsked.jsx"

import "./Account.css";

class Account extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return(
      <div className="acct-container">
        <Nav />
        <ul className="vert-container">
          <li className="vert-nav"><Link to="/acct/friends">Friends</Link></li>
          <li className="vert-nav"><Link to="/acct/rank">Rankings</Link></li>
          <li className="vert-nav"><Link to="/acct/faq">FAQ</Link></li>
          <li className="vert-nav"><Link to="/acct/edit">Account</Link></li>
          <li className="vert-bar" />  
        </ul>
        <Switch>
          <Route path="/acct/friends" component={Friends} /> 
          <Route path="/acct/edit" component={EditProfile} />
          <Route path="/acct/faq" component={FrequentlyAsked} />
          <Route path="/acct/rank" component={Rankings} />
          <Redirect from="/acct/" to="/acct/edit" />
        </Switch> 
      </div>
    )
  }
}

export default Account;
