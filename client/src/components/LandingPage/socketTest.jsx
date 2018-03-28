import React, { Component } from "react";
import io from "socket.io-client/dist/socket.io.js";

const {SOCKET_SERVER_URL} = process.env;

class SocketTest extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      message: ""
    };
  }

  componentWillMount() {
    this.socket = io(SOCKET_SERVER_URL, {
      query: {
        roomId: "socketTest"
      }
    });
    this.socket.emit("client.fetchMessages");
  }

  async componentDidMount() {
    await this.socket.on("server.gameChat", messages => {
      messages.length && this.setState({ messages: messages });
    });
  }

  handleChat(e) {
    this.setState({ message: e.target.value });
  }

  async handleSubmit() {
    const { socket } = this.props;
    let messages = [...this.state.messages, this.state.message];
    this.socket.emit("client.gameChat", {
      messages
    });
  }

  resetInput(e) {
    e.preventDefault();
    e.target.reset();
    this.setState({ message: "" });
  }

  render() {
    return (
      <div className="landing-page-container">
        <h1>Shogi Grandmaster</h1>
        <form onSubmit={e => this.resetInput(e)}>
          <textarea onChange={e => this.handleChat(e)} />
          <button type="submit" onClick={() => this.handleSubmit()}>
            Submit
          </button>
        </form>
        <div className="chatbox">
          {this.state.messages.length > 0 &&
            this.state.messages.map((message, i) => {
              return <div key={i}>{message}</div>;
            })}
        </div>
      </div>
    );
  }
}

export default SocketTest;
