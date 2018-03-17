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
<<<<<<< HEAD
    this.props.socket.emit("client.fetchMessages");
=======
    // this.props.socket.emit("client.fetchHomeMessages");
>>>>>>> Added chat to home page.
  }

  async componentDidMount() {
    await this.props.socket.on("server.homeChat", message => {
<<<<<<< HEAD
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
=======
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
>>>>>>> Added chat to home page.
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
<<<<<<< HEAD
          <textarea onKeyUp={e => this.handleChat(e)} />
=======
          <textarea onChange={e => this.handleChat(e)} />
>>>>>>> Added chat to home page.
          <button type="submit" onClick={() => this.handleSubmit()}>
            Submit
          </button>
        </form>
        <div className="chatbox">
          {this.state.messages.length > 0 &&
<<<<<<< HEAD
            this.state.messages.slice(0, 20).map((message, i) => {
              return (
                <div key={i}>{`${message.username}: ${message.content}`}</div>
              );
=======
            this.state.messages.map((message, i) => {
              return <div key={i}>{`${message.username}: ${message.message}`}</div>;
>>>>>>> Added chat to home page.
            })}
        </div>
      </div>
    );
  }
}

export default HomeChat;
