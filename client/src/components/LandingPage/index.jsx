import React, { Component } from "react";
import { FullLockup } from "../Global/Logo"
import { FadeIn } from '../Global/Animation/Transitions.jsx';

import './Landing.css';

class LandingPage extends Component {
  state = {
  };

  render() {
    return (
      <div className="landing__page">
        <FadeIn>
          <div className="landing__page-container">
            <div className="logo__container">
              <FullLockup />
            </div>
            <div>
              <a className="landing__link-primary" onClick={() => this.props.history.push("/login")}>Enter</a>
            </div>
          </div>
        </FadeIn>
      </div>
    );
  }
}

export default LandingPage;
