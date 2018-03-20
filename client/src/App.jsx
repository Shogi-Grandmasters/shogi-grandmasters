import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import LandingPage from "./components/LandingPage/index.jsx";
import SocketTest from "./components/LandingPage/socketTest.jsx";
import Signup from "./components/Auth/Signup.jsx";
import Login from "./components/Auth/Login.jsx";
import ShogiBoard from "./components/GameBoard/ShogiBoard.jsx";
import Home from "./components/Home/index.jsx";
import Protected from "./components/Global/Protected.jsx";
import Account from "./components/Account/index.jsx"
import BoardIndex from "./components/GameBoard/index.jsx";

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
          <Route path="/acct" component={(props) => (
            <Protected component={Account} {...props} />
          )}/>
          <Route path="/home" component={(props) => (
            <Protected component={Home} {...props} />
          )}/>
          <Route path="/:matchId" component={BoardIndex} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
