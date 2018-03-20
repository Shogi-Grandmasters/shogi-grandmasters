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
        roomId: this.props.location.pathname.slice(1),
        username: localStorage.getItem("username")
      }
    });
  }

  async componentDidMount() {
    this.socket.on("server.connect", (waiting) => {
      this.setState({ waiting });
    });

    this.socket.on(
      "server.joined",
      ({ matchId, black, white, board, turn, hand_black, hand_white }) => {
        this.setState({
          waiting: false,
          matchId,
          black,
          white,
          turn,
          board,
          hand_black,
          hand_white
        });
      }
    );

    let { matchId, black, white } = this.props.location.state;
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
        match={this.props.location.state.match}
      />
    ) : (
      <div>
        <ShogiBoard socket={this.socket} match={this.state} />
        <GameChat socket={this.socket} />
      </div>
    );
  }
}

export default BoardIndex;
