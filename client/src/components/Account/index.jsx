import React, { Component } from 'react';
import axios from 'axios';
import Logo from '../Global/Logo/index.js';
import Nav from '../Global/Nav/Nav.jsx';
import Friends from '../Friends/index.jsx';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import EditProfile from './EditProfile.jsx';
import Rankings from './Rankings.jsx';
import FrequentlyAsked from './FrequentlyAsked.jsx';
import MatchHistory from './MatchHistory.jsx';
import Leaderboard from '../Home/Leaderboard/index.jsx';

import './Account.css';

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
          <li className="vert-nav"><Link to="/acct/edit">Account</Link></li>
          <li className="vert-nav"><Link to="/acct/friends">Friends</Link></li>
          <li className="vert-nav"><Link to="/acct/history">History</Link></li>
          <li className="vert-nav"><Link to="/acct/rank">Rank</Link></li>
          <li className="vert-nav"><Link to="/acct/faq">FAQ</Link></li>
          <li className="vert-bar" />  
        </ul>
        <div className="acct-router-container">
        <Switch>
          <Route path="/acct/friends" component={Friends} /> 
          <Route path="/acct/edit" component={EditProfile} />
          <Route path="/acct/rank" component={Leaderboard} />
          <Route path="/acct/history" component={MatchHistory} />
          <Route path="/acct/faq" component={FrequentlyAsked} />
          <Redirect from="/acct/" to="/acct/friends" />
        </Switch> 
        </div>
      </div>
    )
  }
}

export default Account;
