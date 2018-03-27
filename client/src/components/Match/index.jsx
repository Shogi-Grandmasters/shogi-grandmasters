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
        userId: localStorage.getItem("id"),
        username: localStorage.getItem("username")
      }
    });

    let { matchId, black, white } = this.props.location.state;

    //only one user should setup match
    this.socket.emit("client.gameReady", {
      matchId: this.props.location.state.matchId,
      black,
      white
    });
  }

  componentDidMount() {
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

    // this.socket.on("server.reconnect", ({ matchId, black, white }) => {
    //   matchId && black && white && this.socket.emit("client.gameReady", {
    //     matchId: this.props.location.state.matchId,
    //     black,
    //     white
    //   });
    // });
  }

  render() {
    return this.state.waiting ? null : (
      <div>
        <ShogiBoard socket={this.socket} match={this.state} history={this.props.history} />
      </div>
    );
  }
}

export default BoardIndex;
