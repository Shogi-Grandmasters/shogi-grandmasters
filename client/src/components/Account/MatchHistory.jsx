import React, { Component } from 'react';
import axios from 'axios';
import duel from '../../../public/5fb83b603cb5c95c8cbdffb9cb379888.png'

const {REST_SERVER_URL, AVATAR_URL} = process.env;

class MatchHistory extends Component {
  constructor() {
    super();
    this.state = {
      history: [],
    };
  }

  componentWillMount = () => {
    this.fetchMatchHistory()
  }

  fetchMatchHistory = async () => {
    const history = [];
    const id = localStorage.getItem('id');
    let { data } = await axios.get(`${REST_SERVER_URL}/api/matches/history/`, {
      params: { id: id }
    });
    console.log('our fetch match', data)
    for (let match of data) {
      const fid = match.black == id ? match.white : match.black;
      const user = await axios.get(`${REST_SERVER_URL}/api/users/${fid}`);
      match.opponentId = user.data[0].id
      match.outcome = match.winner == id ? 'Win' : 'Loss'
      match.opponentName = user.data[0].username
      console.log(user.data[0])
      match.opponentAvi = user.data[0].avatar
      match.status != 0 && history.push(match);
    }
    this.setState({history: history});
  }

  render() {
    return (
      <div className="online-container"> 
        <div className="online-head">Match History:</div>
        <div className="online-list-container">
        {this.state.history.map((match, index) => (
          <div className="online-friend-container" key={index} >
            <img width="50px" className="friend-avi" src={`${AVATAR_URL}${localStorage.avi}`} />
            {localStorage.username}
            <b className="online-username">{match.outcome}</b>
            <b className="online-username">VS</b>
            <img width="50px" className="friend-avi" src={`${AVATAR_URL}${match.opponentAvi}`} />
            {match.opponentName}
          </div>
        ))}
        </div>
      </div>
    );
  }
}

export default MatchHistory;

// <div className="online-container"> 
//         <div className="online-head">Match History:</div>
//         <div className="online-list-container">
//         {this.state.friends.map((user, index) => (
//           <div className="online-friend-container" key={index} >
//             <img width="50px" className="friend-avi" src={`https://res.cloudinary.com/shogigrandmasters/image/upload/${user.avatar}`} />
//             <b className="online-username">{user.username}</b>
//             <a onClick={() => this.challengeFriend(user)}><img className="online-challenge-icon" src={duel} /></a>
//             <hr />
//           </div>
//         ))}
//         </div>
//       </div>