import React, { Component } from "react";
import io from "socket.io-client/dist/socket.io.js";
import { unescape } from "lodash";

class HomeChat extends Component {
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
        userId: localStorage.getItem("id"),
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
        <form onSubmit={e => this.resetInput(e)}>
          <textarea onKeyUp={e => this.handleChat(e)} />
          {/* <button type="submit" onClick={() => this.handleSubmit()}>
            Submit
          </button> */}
        </form>
        <div className="chatbox">
          {this.state.messages.length > 0 &&
            this.state.messages.slice(0, 20).map((message, i) => {
              return (
                <div key={i}>{`${message.username}: ${unescape(message.content)}`}</div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default HomeChat;
