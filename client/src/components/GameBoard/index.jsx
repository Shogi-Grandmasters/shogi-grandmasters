import React, { Component } from "react";
import io from "socket.io-client/dist/socket.io.js";

import ShogiBoard from "./ShogiBoard.jsx";
import WaitingPage from "../WaitingPage/index.jsx";

class BoardIndex extends Component {
  state = {
    socket: null,
    waiting: true
  };

  componentWillMount() {
    // const challenge =
    //   typeof this.props.location.state.challenge === "string"
    //     ? JSON.parse(this.props.location.state.challenge)
    //     : { title: "" };
    this.socket = io("http://localhost:4155", {
      query: {
        roomId: this.props.location.pathname.slice(1)
      }
    });
  }

  async componentDidMount() {
    this.socket.on("server.joined", () => {
      this.setState({ waiting: false });
    });

    if (this.props.location.state) {
      if (this.props.location.state.opponent) {
        this.socket.emit("client.gameReady");
      }
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
        challenge={this.props.location.state.challenge}
        history={this.props.history}
      />
    );
  }
}

export default BoardIndex;
