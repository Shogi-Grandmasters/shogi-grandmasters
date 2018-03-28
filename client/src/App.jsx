import React, { Component } from "react";
import { Route, Switch, IndexRoute } from "react-router-dom";

import LandingPage from "./components/LandingPage/index.jsx";
import SocketTest from "./components/LandingPage/socketTest.jsx";
import Signup from "./components/Auth/Signup.jsx";
import Login from "./components/Auth/Login.jsx";
import Home from "./components/Home/index.jsx";
import Protected from "./components/Global/Protected.jsx";
import Account from "./components/Account/index.jsx";
import BoardIndex from "./components/Match/index.jsx";
import Friends from "./components/Friends/index.jsx";
import EditProfile from "./components/Account/EditProfile.jsx";
import FrequentlyAsked from "./components/Account/FrequentlyAsked.jsx";
import Rankings from "./components/Account/Rankings.jsx";
import WaitingPage from "./components/WaitingPage/index.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route
            path="/acct"
            component={props => <Protected component={Account} {...props} />}
          />
          <Route
            path="/home"
            component={props => <Protected component={Home} {...props} />}
          />
          <Route path="/match/queue" component={WaitingPage} />
          <Route path="/match/:matchId" component={BoardIndex} />
          <Route exact path="/" component={LandingPage} />
          <Route path="*" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;

// <Route path="/acct" component={(props) => (
//   <Protected component={Account} {...props} />
// )}>
//   <Route path="/acct/edit" component={EditProfile} />
//   <Route path="/acct/friends" component={Friends} />
//   <Route path="/acct/faq" component={FrequentlyAsked} />
//   <Route path="/acct/rank" component={Rankings} />
// </Route>