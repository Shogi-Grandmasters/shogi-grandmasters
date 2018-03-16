import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import LandingPage from "./components/LandingPage/index.jsx";
import Signup from "./components/Auth/Signup.jsx";
import Login from "./components/Auth/Login.jsx";
import ShogiBoard from "./components/GameBoard/ShogiBoard.jsx";
import Home from "./components/Home/index.jsx";
import Protected from "./components/Global/Protected.jsx";
import Account from "./components/Account/index.jsx"


class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/board" component={ShogiBoard} />
          <Route exact path="/" component={LandingPage} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={(props) => (
            <Protected component={Home} {...props} />
          )}/>
          <Route path="/acct" component={(props) => (
            <Protected component={Account} {...props} />
          )}/>
        </Switch>
      </div>
    );
  }
}

export default App;
