import React, { Component } from "react";
import axios from "axios";

import "./Leaderboard.css";

const { REST_SERVER_URL } = process.env;

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unrankedLeaderboard: [],
      rankedLeaderboard: []
    };
  }

  async componentDidMount() {
    const { data } = await axios.get(`${REST_SERVER_URL}/api/leaderboard`);
    this.setState({
      unrankedLeaderboard: JSON.parse(data.unrankedLeaderboard) || [],
      rankedLeaderboard: JSON.parse(data.rankedLeaderboard) || []
    });
  }

  componentWillUnmount() {
    this.props.socket && this.props.socket.close();
  }

  render() {
    return (
      <div className="leaderboard-container">
        <div className="leaderboard-head">GRANDMASTERS</div>
        <div className="leaderboard-list-container">
          <div className="leaderboard-list-head">
            <b />
            <b>Player</b>
            <b>Rating</b>
          </div>
          {this.state.rankedLeaderboard.map((leader, index) => (
            <div className="leader-container" key={index}>
              <b className="leader-rank">#{index + 1}</b>
              <div className="leader-player">
                <img
                  className="leader-avi"
                  src={`https://res.cloudinary.com/shogigrandmasters/image/upload/${
                    leader.avatar
                  }`}
                />
                <div className="leader-username">{leader.username}</div>
              </div>
              <b className="leader-rating">{leader.rating_ranked}</b>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Leaderboard;
