import React, { Component } from "react";
import axios from "axios";
import { unescape } from "lodash";

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
    this.id = +localStorage.getItem("id");
    this.username = localStorage.getItem("username");

    this.props.socket.emit("client.fetchMessages", { userId: this.id });

    await this.props.socket.on("server.popupChat", message => {
      this.setState({ messages: [message, ...this.state.messages] });
    });
    await this.props.socket.on(`server.sendPopupMessages${this.id}`, messages => {
      this.setState({ messages });
    });
  }

  componentWillUnmount() {
    this.props.socket.close();
  }

  async handleChat(e) {
    e.persist();
    const { id, value } = e.target;
    await this.setState({ message: { id, value } });
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      this.handleSubmit();
      e.target.value = "";
    }
  }

  handleSubmit() {
    this.state.message.value !== "\n" &&
      this.state.message.value.length &&
      this.props.socket.emit("client.popupChat", {
        user_id: this.id,
        username: this.username,
        content: this.state.message.value,
        friend_id: +this.state.message.id
      });
  }

  resetInput(e) {
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
                this.state.messages
                  .filter(
                    message =>
                      (message.friend_id === friend.id ||
                        message.user_id === friend.id) &&
                      (message.friend_id === this.id ||
                        message.user_id === this.id)
                  )
                  .reverse()
                  .map((message, i) => {
                    return (
                      <div className="" key={i}>
                        <strong>{message.username}</strong>{" "}
                        {unescape(message.content)}
                      </div>
                    );
                  })}
            </div>
            <form onSubmit={e => e.preventDefault()}>
              <div className="">
                <input id={friend.id} onKeyUp={e => this.handleChat(e)} />
                {/* <button type="submit" onClick={() => this.handleSubmit()}>
                  &gt;
                </button> */}
              </div>
            </form>
          </div>
        ))}
      </div>
    );
  }
}

export default ChatPopup;
