import React, { Component } from 'react';
import axios from 'axios';
import CircularProgressBar from './CircularProgressBar.jsx';
import './Snapshot.css';

const {REST_SERVER_URL} = process.env;

class MatchHistorySnapshot extends Component {
  constructor() {
    super();
    this.state = {
      percentage: 0,
      history: [],
    };
  }

  componentWillMount = () => {
    this.fetchMatchSnapshot()
  }

  fetchMatchSnapshot = async () => {
    let history = [];
    const id = localStorage.getItem('id');
    let { data } = await axios.get(`${REST_SERVER_URL}/api/matches/history/`, {
      params: { id: id }
    });
    for (let match of data) {
      const fid = match.black == id ? match.white : match.black;
      match.outcome = match.winner == id ? 1 : 0;
      match.status != 0 && history.push(match);
    }
    history = history.length > 4 ? history.slice(0, 5) : []; 
    let winCount = 0;
    history.forEach(match => winCount += match.outcome)
    let percent = 20 * winCount
    this.setState({ percentage: percent });
  }

  //change the sqSize to resize 
  render() {
    return (
        <div className="match-snapshot-container">
        Winrate past 5 games
          <CircularProgressBar
            strokeWidth="7"
            sqSize="50"
            percentage={this.state.percentage}/>
        </div>
    );
  }
}

export default MatchHistorySnapshot;
