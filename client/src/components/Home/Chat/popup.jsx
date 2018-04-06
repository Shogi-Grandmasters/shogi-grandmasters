import React, { Component } from "react";
import axios from "axios";
import { unescape } from "lodash";
import moment from "moment";

import "./popup.css";

const { REST_SERVER_URL } = process.env;

class ChatPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: "",
      timestamps: {},
    };
  }

  async componentDidMount() {
    this.id = +localStorage.getItem("id");
    this.username = localStorage.getItem("username");

    this.props.socket.emit("client.fetchMessages", { userId: this.id });

    await this.props.socket.on(
      `server.sendPopupMessages${this.id}`,
      messages => {
        this.setState({ messages });
        this.setTimestamps();
      }
    );

    this.props.socket.on("server.popupChat", message => {
      const { timestamps } = this.state;
      timestamps[message.user_id] = message.created;
      this.setState({ messages: [message, ...this.state.messages], timestamps });
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
        friend_id: +this.state.message.id,
        created: new Date(),
      });
    e.target.reset();
    this.setState({ message: "" });
  }

  setTimestamps() {
    let { timestamps, messages } = this.state;
    for (let message of messages) {
      !timestamps[message.user_id] && message.user_id !== this.id
        && (timestamps[message.user_id] = message.created);
    }
    this.setState({ timestamps });
  }

  renderTimestamps(id) {
    const { timestamps } = this.state;
    return timestamps[id]
      ? <div className="timestamp">{moment(timestamps[id]).fromNow()}</div> : null;
  }

  render() {
    let right = 100;
    return (
      <div className={"chat"}>
        {this.props.activePopups.map((friend, i) => (
          <div
            className={friend.minimized ? "popup-box-min" : "popup-box"}
            key={i}
            style={this.props.zeroOffset ? {} : { right: `${right}px` }}
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
                {this.props.removeActivePopup ? (
                  <a onClick={() => this.props.removeActivePopup(friend.id)}>
                    &#10006;
                  </a>
                ) : null}
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
                  .map((message, i) => (
                    <div className="popup-message" key={i}>
                      <strong>{message.username}</strong>{" "}
                      {unescape(message.content)}
                    </div>
                  ))}
            </div>
            {this.renderTimestamps(friend.id)}
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
