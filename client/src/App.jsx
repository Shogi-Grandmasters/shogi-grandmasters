import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import LandingPage from "./components/LandingPage/index.jsx";
import Signup from "./components/Auth/Signup.jsx";
import Login from "./components/Auth/Login.jsx";
import ShogiBoard from "./components/GameBoard/ShogiBoard.jsx";

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
        </Switch>
      </div>
    );
  }
}

export default App;
