import React, { Component } from 'react';
import axios from 'axios';
import CircularProgressBar from './CircularProgressBar.jsx';

const {REST_SERVER_URL} = process.env;

class MatchHistorySnapshot extends Component {
  constructor() {
    super();
    this.state = {
      percentage: 0,
      history: [],
    };
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
  }

  componentWillMount = () => {
    this.fetchMatchHistory()
  }

  fetchMatchHistory = async () => {
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
    history = history.slice(0, 5)
    console.log(history)
    this.setState({history: history});
  }

  handleChangeEvent(event) {
    this.setState({
      percentage: event.target.value
    });
  }

  render() {
    return (
      <div>
          <CircularProgressBar
            strokeWidth="10"
            sqSize="200"
            percentage={this.state.percentage}/>
          <div>
            <input 
              id="progressInput" 
              type="range" 
              min="0" 
              max="100" 
              step="1"
              value={this.state.percentage}
              onChange={this.handleChangeEvent}/>
          </div>
        </div>
    );
  }
}

export default MatchHistorySnapshot;
