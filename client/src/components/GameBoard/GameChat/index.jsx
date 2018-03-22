import React, { Component } from "react";
import io from "socket.io-client/dist/socket.io.js";

import './GameChat.css';

class GameChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: ""
    };
  }

  componentWillMount() {
    this.props.socket.emit("client.fetchMessages");
  }

  async componentDidMount() {
    await this.props.socket.on("server.homeChat", message => {
      this.setState({ messages: [message, ...this.state.messages] });
    });
    await this.props.socket.on("server.sendMessages", messages => {
      this.setState({ messages });
    });
  }

  async handleChat(e) {
    e.persist();
    await this.setState({ message: e.target.value });
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      this.handleSubmit();
      e.target.value = "";
    }
  }

  handleSubmit() {
    this.state.message !== "\n" &&
      this.state.message.length &&
      this.props.socket.emit("client.homeChat", {
        username: localStorage.getItem("username"),
        content: this.state.message
      });
  }

  resetInput(e) {
    e.preventDefault();
    e.target.reset();
    this.setState({ message: "" });
  }

  render() {
    return (
      <div className="home-chat-container">
        <div className="chatbox">
          {this.state.messages.length > 0 &&
            this.state.messages.slice(0, 20).map((message, i) => {
              return (
                <div className="chat__message" key={i}><strong>{message.username}</strong>: {message.content}</div>
              );
            })}
        </div>
        <form onSubmit={e => this.resetInput(e)}>
          <input onKeyUp={e => this.handleChat(e)} />
          <button type="submit" onClick={() => this.handleSubmit()}>
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default GameChat;
