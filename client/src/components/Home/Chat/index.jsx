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
    // this.props.socket.emit("client.fetchHomeMessages");
  }

  async componentDidMount() {
    await this.props.socket.on("server.homeChat", message => {
      this.setState({ messages: [...this.state.messages, message] });
    });
  }

  handleChat(e) {
    this.setState({ message: e.target.value });
  }

  handleSubmit() {
    this.props.socket.emit("client.homeChat", {
      username: localStorage.getItem("username"),
      message: this.state.message
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
              return <div key={i}>{`${message.username}: ${message.message}`}</div>;
            })}
        </div>
      </div>
    );
  }
}

export default HomeChat;
