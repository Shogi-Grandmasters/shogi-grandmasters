import React, { Component } from "react";
import axios from "axios";
import { unescape } from "lodash";

import "./popup.css";

const { REST_SERVER_URL } = process.env;

class ChatPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: ""
    };
  }

  async componentDidMount() {
    this.id = +localStorage.getItem("id");
    this.username = localStorage.getItem("username");

    this.props.socket.emit("client.fetchMessages", { userId: this.id });

    this.props.socket.on(
      `server.sendPopupMessages${this.id}`,
      messages => {
        this.setState({ messages });
      }
    );

    this.props.socket.on("server.popupChat", message => {
      this.setState({ messages: [message, ...this.state.messages] });
    });
  }

  componentWillUnmount() {
    this.props.socket.close();
  }

  async handleChat(e) {
    const { id, value } = e.target;
    await this.setState({ message: { id, value } });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.state.message.value !== "\n" &&
      this.state.message.value.length &&
      this.props.socket.emit("client.homeChat", {
        user_id: this.id,
        username: this.username,
        content: this.state.message.value,
        friend_id: +this.state.message.id
      });
    e.target.reset();
    this.setState({ message: "" });
  }

  render() {
    let right = 100;
    return (
      <div className={"chat"}>
        {this.props.activePopups.map((friend, i) => (
          <div
            className={friend.minimized ? "popup-box-min" : "popup-box"}
            key={i}
            style={{ right: `${right}px` }}
            {...(right += 305)}
          >
            <div className={friend.minimized ? "popup-head-min" : "popup-head"}>
              <div
                className="popup-head-left"
                onClick={() => this.props.minimizePopup(friend.id)}
              >
                {friend.username}
              </div>
              <div className="popup-head-right">
                {friend.minimized ? (
                  <a onClick={() => this.props.minimizePopup(friend.id)}>
                    &#10010;
                  </a>
                ) : (
                  <a onClick={() => this.props.minimizePopup(friend.id)}>
                    &#8212;
                  </a>
                )}
                <a onClick={() => this.props.removeActivePopup(friend.id)}>
                  &#10006;
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
                  .map((message, i) => {
                    return (
                      <div className="popup-message" key={i}>
                        <strong>{message.username}</strong>{" "}
                        {unescape(message.content)}
                      </div>
                    );
                  })}
            </div>
            <form onSubmit={e => this.handleSubmit(e)}>
              <div
                className={
                  friend.minimized ? "popup-actions-min" : "popup-actions"
                }
              >
                <input id={friend.id} onKeyUp={e => this.handleChat(e)} />
                <button type="submit">&gt;</button>
              </div>
            </form>
          </div>
        ))}
      </div>
    );
  }
}

export default ChatPopup;
