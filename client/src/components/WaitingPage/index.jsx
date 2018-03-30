import React, { Component } from "react";
import io from "socket.io-client/dist/socket.io.js";
import axios from "axios";

import "./WaitingPage.css";

const {SOCKET_SERVER_URL} = process.env;

class WaitingPage extends Component {
  componentWillMount() {
    this.socket = io(SOCKET_SERVER_URL, {
      query: {
        roomId: "matchQueue",
      }
    });
  }

  componentDidMount() {
    this.userId = +localStorage.getItem("id");
    this.rank = +localStorage.getItem("rank");

    if (this.props.location.history) {
      const event = this.props.location.state.ranked ? "client.joinRankedQueue" : "client.joinQueue";
      this.socket.emit(`${event}`, {userId: this.userId, rank: this.rank });
    } 

    this.socket.on("server.joinMatch", ({ matchId, black, white }) => {
      if (this.userId === black || this.userId === white) {
        this.props.history.push({
          pathname: `/match/${matchId}`,
          state: {
            matchId,
            black,
            white
          },
          history: this.props.history
        });
      }
    });
  }

  async handleCancelMatchclick() {
    const event = this.props.location.state.ranked ? "client.leaveRankedQueue" : "client.leaveQueue";
    this.socket.emit(`${event}`, this.userId);
    this.props.history.push("/home");
  }

  render() {
    return (
      <div className="container">
        <div className="waiting__message">
          <h2>Searching for an Opponent</h2>
          <div className="lds-ripple"><div></div><div></div></div>
          <button onClick={this.handleCancelMatchclick.bind(this)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default WaitingPage;
