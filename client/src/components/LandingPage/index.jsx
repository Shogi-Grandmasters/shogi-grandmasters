import React, { Component } from "react";
import { FullLockup } from "../Global/Logo"

import './Landing.css';

class LandingPage extends Component {
  state = {
  };

  render() {
    return (
      <div className="landing-page-container">
        <div className="logo__container">
          <FullLockup />
        </div>
        <div>
          <a className="landing__link-primary" onClick={() => this.props.history.push("/login")}>Enter</a>
        </div>
        <div className="landing__signup-cta">
          <em>New Here?</em> <a className="landing__link-secondary" onClick={() => this.props.history.push("/signup")}>Sign Up</a>
        </div>
      </div>
    );
  }
}

export default LandingPage;
