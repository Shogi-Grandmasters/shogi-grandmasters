import React, { Component } from "react";

class LandingPage extends Component {
  state = {
  };

  render() {
    return (
      <div className="landing-page-container">
        <h1>Shogi </h1>
        <input
          type="submit"
          value="Login"
          onClick={() => this.props.history.push("/login")}
        />
        <input
          type="submit"
          value="Signup"
          onClick={() => this.props.history.push("/signup")}
        />
      </div>
    );
  }
}

export default LandingPage;
