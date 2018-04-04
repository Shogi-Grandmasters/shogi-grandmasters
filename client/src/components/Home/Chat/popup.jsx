import React, { Component } from "react";
import axios from "axios";

import "./popup.css";

const { REST_SERVER_URL } = process.env;

class ChatPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePopups: [this.props.activePopups],
      messages: [],
      message: ""
    };
  }

  async componentDidMount() {
    this.props.socket.emit("client.fetchMessages");

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
        userId: localStorage.getItem("id"),
        username: localStorage.getItem("username"),
        content: this.state.message
      });
    console.log(this.state);
  }

  resetInput(e) {
    e.preventDefault();
    e.target.reset();
    this.setState({ message: "" });
  }

  render() {
    let right = 0;
    return (
      <div className={"chat"}>
        {this.props.activePopups.map((friend, i) => (
          <div
            className={friend.minimized ? "popup-box-min" : "popup-box"}
            key={i}
            id={friend.id}
            style={{ right: `${right}px` }}
            {...(right += 300)}
          >
            <div className="popup-head">
              <div
                className="popup-head-left"
                onClick={() => this.props.minimizePopup(friend.id)}
              >
                {friend.username}
              </div>
              <div
                className={
                  friend.minimized ? "popup-head-right-min" : "popup-head-right"
                }
              >
                <a onClick={() => this.props.minimizePopup(friend.id)}>- </a>
                <a onClick={() => this.props.removeActivePopup(friend.id)}>
                  &#10005;
                </a>
              </div>
            </div>
            <div
              className={
                friend.minimized ? "popup-messages-min" : "popup-messages"
              }
            >
              {this.state.messages.length > 0 &&
                this.state.messages.slice(0, 10).map((message, i) => {
                  return (
                    <div className="" key={i}>
                      <strong>{message.username}</strong>{" "}
                      {unescape(message.content)}
                    </div>
                  );
                })}
            </div>
            <form onSubmit={e => this.resetInput(e)}>
              <div className="">
                <input onKeyUp={e => this.handleChat(e)} />
                <button type="submit" onClick={() => this.handleSubmit()}>
                  &gt;
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>
    );
  }
}

export default ChatPopup;
