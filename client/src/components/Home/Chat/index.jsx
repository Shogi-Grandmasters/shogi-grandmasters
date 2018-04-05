import React, { Component } from "react";
import io from "socket.io-client/dist/socket.io.js";
import { unescape } from "lodash";

import "./Chat.css";

class HomeChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: ""
    };
  }

  componentWillMount() {}

  async componentDidMount() {
    this.id = +localStorage.getItem("id");
    this.username = localStorage.getItem("username");
    
    this.props.socket.emit("client.fetchMessages", { userId: null });

    await this.props.socket.on("server.homeChat", message => {
      this.setState({ messages: [message, ...this.state.messages] });
    });
    await this.props.socket.on("server.sendMessages", messages => {
      this.setState({ messages });
    });
  }

  componentWillUnmount() {
    this.props.socket.close();
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
        user_id: this.id,
        friend_id: this.id,
        username: this.username,
        content: this.state.message
      });
  }

  resetInput(e) {
    e.preventDefault();
    e.target.reset();
    this.setState({ message: "" });
  }

  render() {
    let chatStyles = ["match__chat"];
    this.props.visibility
      ? chatStyles.push("shown")
      : chatStyles.push("hidden");

    return (
      <div>
        <div className="match__chat-container">
          <div className="chatbox">
            {this.state.messages.length > 0 &&
              this.state.messages.slice(0, 20).map((message, i) => {
                return (
                  <div className="chat__message" key={i}>
                    <strong>{message.username}</strong>{" "}
                    {unescape(message.content)}
                  </div>
                );
              })}
          </div>
          <form onSubmit={e => this.resetInput(e)}>
            <div className="chat__input">
              <input onKeyUp={e => this.handleChat(e)} />
              <button type="submit" onClick={() => this.handleSubmit()}>
                &gt;
              </button>
            </div>
          </form>
        </div>
        <div className="match__chat-actions">
          <button className="chat__close" onClick={() => this.toggle("chat")}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default HomeChat;
