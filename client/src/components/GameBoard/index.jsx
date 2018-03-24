import React, { Component } from "react";
import io from "socket.io-client/dist/socket.io.js";

import WaitingPage from "../WaitingPage/index.jsx";
import ShogiBoard from "./ShogiBoard.jsx";
import GameChat from "./GameChat/index.jsx";

class BoardIndex extends Component {
  state = {
    waiting: true
  };

  componentWillMount() {
    this.socket = io("http://localhost:4155", {
      query: {
        roomId: this.props.match.params.matchId,
        username: localStorage.getItem("username")
      }
    });
  }

  async componentDidMount() {
    let { matchId, black, white } = this.props.location.state;
    this.socket.on("server.reconnect", ({ black, white }) => {
      black &&
        white &&
        this.socket.emit("client.gameReady", { matchId, black, white });
    });

    this.socket.on("server.joined", data => {
      let { id, board, turn, hand_black, hand_white, event_log } = data[0];
      let black = data[1];
      let white = data[2];
      this.setState({
        waiting: false,
        matchId: id,
        black,
        white,
        turn,
        board,
        hand_black,
        hand_white,
        event_log
      });
    });

    if (this.state.waiting && white) {
      this.socket.emit("client.gameReady", {
        matchId,
        black,
        white
      });
    }
  }

  render() {
    return this.state.waiting ? (
      <WaitingPage
        history={this.props.history}
        match={this.props.location.state.matchId}
      />
    ) : (
      <div>
        <ShogiBoard socket={this.socket} match={this.state} />
      </div>
    );
  }
}

export default BoardIndex;
