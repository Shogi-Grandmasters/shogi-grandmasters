import React, { Component } from "react";
import io from "socket.io-client/dist/socket.io.js";

import ShogiBoard from "./ShogiBoard.jsx";
import WaitingPage from "../WaitingPage/index.jsx";

class BoardIndex extends Component {
  state = {
    waiting: true
  };

  componentWillMount() {
    this.socket = io("http://localhost:4155", {
      query: {
        roomId: this.props.location.pathname.slice(1)
      }
    });
  }
  
  async componentDidMount() {
    this.socket.on("server.joined", ({ matchId, black, white }) => {
      this.setState({
        waiting: false,
        matchId,
        black,
        white
      });
    });
    
    let { matchId, black, white } = this.props.location.state;
    if (white) {
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
      <ShogiBoard
        socket={this.socket}
        match={this.state}
      />
    );
  }
}

export default BoardIndex;
