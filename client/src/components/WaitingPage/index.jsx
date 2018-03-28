import React, { Component } from "react";
import io from "socket.io-client/dist/socket.io.js";
import axios from "axios";

import "./WaitingPage.css";

const {SOCKET_SERVER_URL} = process.env;

class WaitingPage extends Component {
  componentWillMount() {
    this.socket = io(SOCKET_SERVER_URL, {
      query: {
        roomId: "matchQueue",
        username: localStorage.getItem("username"),
        userId: localStorage.getItem("id")
      }
    });
  }

  componentDidMount() {
    const userId = localStorage.getItem("id");

    this.props.location.history && this.socket.emit("client.joinQueue", userId);

    this.socket.on("server.joinMatch", ({ matchId, black, white }) => {
      if (userId === black || userId === white) {
        this.props.history.push({
          pathname: `/match/${matchId}`,
          state: {
            matchId: matchId,
            black,
            white
          },
          history: this.props.history
        });
      }
    });
  }

  async handleCancelMatchclick() {
    // let { data } = await axios.delete("http://localhost:3396/api/openmatches", {
    //   data: { matchId: this.props.match }
    // });
    this.socket.emit("client.leaveQueue", localStorage.getItem("id"));
    this.props.history.push("/home");
  }

  render() {
    return (
      <div className="outer">
        <div className="waiting">
          <button onClick={this.handleCancelMatchclick.bind(this)}>
            Cancel Match
          </button>
          <br />
          {/* <img
            src=""
            alt="waiting"
          /> */}
          <p>
            You Are Waiting. When an opponent joins you will be brought to your
            duel.
          </p>
        </div>
      </div>
    );
  }
}

export default WaitingPage;
