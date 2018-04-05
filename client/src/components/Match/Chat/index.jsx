import React, { Component } from "react";
import io from "socket.io-client/dist/socket.io.js";
import { escape, unescape } from "lodash";

import "./GameChat.css";

class GameChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: ""
    };
    this.toggle = props.toggle;
  }

  componentWillMount() {}

  async componentDidMount() {
    const { match } = this.props;
    this.id = +localStorage.getItem("id");
    this.username = localStorage.getItem("username");
    this.opponent =
      match.black.id === this.id ? match.white.id : match.black.id;

    this.props.socket.emit("client.fetchMessages", {
      userId: this.id,
      friendId: this.opponent
    });

    await this.props.socket.on("server.popupChat", message => {
      this.setState({ messages: [message, ...this.state.messages] });
    });
    await this.props.socket.on(`server.sendPopupMessages${this.id}`, messages => {
      messages = messages.filter(message => (
        !(message.friend_id !== this.opponent && message.user_id !== this.opponent)
      ));
      this.setState({ messages });
    });
  }

  async handleChat(e) {
    await this.setState({ message: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.state.message !== "\n" &&
      this.state.message.length &&
      this.props.socket.emit("client.homeChat", {
        user_id: this.id,
        username: this.username,
        content: this.state.message,
        friend_id: this.opponent
      });
    e.target.reset();
    this.setState({ message: "" });
  }

  render() {
    let chatStyles = ["match__chat"];
    this.props.visibility
      ? chatStyles.push("shown")
      : chatStyles.push("hidden");

    return (
      <div className={chatStyles.join(" ")}>
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
          <form onSubmit={e => this.handleSubmit(e)}>
            <div className="chat__input">
              <input onKeyUp={e => this.handleChat(e)} />
              <button type="submit">
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

export default GameChat;
