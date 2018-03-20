import React, { Component } from "react";
import io from "socket.io-client/dist/socket.io.js";
import axios from "axios";

import "./WaitingPage.css";

class WaitingPage extends Component {

  async handleCancelMatchclick() {
    let { data } = await axios.delete("http://localhost:3396/api/openmatches", {
      data: { matchId: this.props.match }
    });
    this.props.history.push("/home");
  }

  render() {
    return (
      <div className="outer">
        <div className="waiting">
          <button onClick={this.handleCancelMatchclick.bind(this)}>
            Cancel Match
          </button>
          <br />
          {/* <img
            src=""
            alt="waiting"
          /> */}
          <p>
            You Are Waiting. When an opponent joins you will be brought to your
            duel.
          </p>
        </div>
      </div>
    );
  }
}

export default WaitingPage;
