import React, { Component } from "react";
import io from "socket.io-client/dist/socket.io.js";

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
      this.setState({ messages: [...this.state.messages, message] });
    });
    await this.props.socket.on("server.sendMessages", messages => {
      this.setState({ messages });
    });
  }

  handleChat(e) {
    this.setState({ message: e.target.value });
  }

  handleSubmit() {
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
        <form onSubmit={e => this.resetInput(e)}>
          <textarea onChange={e => this.handleChat(e)} />
          <button type="submit" onClick={() => this.handleSubmit()}>
            Submit
          </button>
        </form>
        <div className="chatbox">
          {this.state.messages.length > 0 &&
            this.state.messages.map((message, i) => {
              return (
                <div key={i}>{`${message.username}: ${message.content}`}</div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default HomeChat;
