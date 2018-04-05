import React, { Component } from "react";
import Logo from "../Global/Logo"

import './Landing.css';

class LandingPage extends Component {
  state = {
  };

  render() {
    return (
      <div className="landing-page-container">
        <br/>
        <Logo />
        <div className="landing-title">Shogi Grandmasters</div>
        <input
          type="submit"
          value="Login"
          className="landing-button"
          onClick={() => this.props.history.push("/login")}
        />
        <br />
        <input
          type="submit"
          value="Signup"
          className="landing-button"
          onClick={() => this.props.history.push("/signup")}
        />
      </div>
    );
  }
}

export default LandingPage;
