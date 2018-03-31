import React, { Component } from "react";
import io from "socket.io-client/dist/socket.io.js";
import axios from "axios";

import "./WaitingPage.css";

const { REST_SERVER_URL, SOCKET_SERVER_URL } = process.env;

class WaitingPage extends Component {
  componentWillMount() {
    this.socket = io(SOCKET_SERVER_URL, {
      query: {
        roomId: "matchQueue"
      }
    });
  }

  async componentDidMount() {
    this.userId = +localStorage.getItem("id");
    
    const { data } = await axios.get(`${REST_SERVER_URL}/api/users/${this.userId}`);
    this.ranked = this.props.location.state.ranked;
    this.rating = this.ranked ? data[0].rating_ranked : data[0].rating_unranked;

    if (this.props.location.history) { //prevents rejoining queue on refresh
      // const rating = this.ranked
      //   ? +localStorage.getItem("rankedRating")
      //   : +localStorage.getItem("unrankedRating");
      this.socket.emit("client.joinQueue", { userId: this.userId, rating: this.rating, ranked: this.ranked });
    }

    this.socket.on("server.joinMatch", ({ matchId, black, white }) => {
      if (this.userId === black || this.userId === white) {
        this.props.history.push({
          pathname: `/match/${matchId}`,
          state: {
            matchId,
            black,
            white
          },
          history: this.props.history
        });
      }
    });
    
    window.onpopstate = (e) => {
      this.handleCancelMatchclick();
    }
  }

  async handleCancelMatchclick() {
    this.socket.emit("client.leaveQueue", { userId: this.userId, ranked: this.ranked });
    this.props.history.push("/home");
  }

  render() {
    return (
      <div className="container">
        <div className="waiting__message">
          <h2>Searching for an Opponent</h2>
          <div className="lds-ripple">
            <div />
            <div />
          </div>
          <button onClick={this.handleCancelMatchclick.bind(this)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default WaitingPage;
