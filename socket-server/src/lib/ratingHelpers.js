import eloRank from 'elo-rank';
import axios from 'axios';
import { success, error } from "./log.js";

// new players start at 1000
// players below 2000 have K-factor of 32
// players between 2000 and 2500 have K-factor of 24
// players above 2500 have K-factor of 16

export const endMatch = ([winner, loser], draw = false) => {
  let elo;
  if (winner <= 2000) {
    elo = new eloRank(32);
  } else if (winner <= 2500) {
    elo = new eloRank(24);
  } else {
    elo = new eloRank(16);
  }
  let winnerExpected = elo.getExpected(winner.rating, loser.rating);
  let winnerUpdated = elo.updateRating(winnerExpected, draw ? 0.5 : 1, winner.rating);
  winner.rating = winnerUpdated > 99 ? winnerUpdated : 100;

  if (loser <= 2000) {
    elo = new eloRank(32);
  } else if (loser <= 2500) {
    elo = new eloRank(24);
  } else {
    elo = new eloRank(16);
  }
  let loserExpected = elo.getExpected(loser.rating, winner.rating);
  let loserUpdated = elo.updateRating(loserExpected, draw ? 0.5 : 1, loser.rating);
  loser.rating = loserUpdated > 99 ? loserUpdated : 100;

  return [winner, loser]
}

export const updateRating = async ({ id, rating }) => {
  try {
    const { rows } = await axios.put("http://localhost:3396/api/users", {
      userId: id,
      rating: rating
    });
    success(
      "updateRating - successfully updated user rating",
      JSON.stringify(rows[0])
    );
    return rows[0];
  } catch (err) {
    error("updateRating - error= ", err);
    throw new Error(err);
  }
};

export const updateLeaderboard = async (player) => {
  let data;
  try {
    data = await axios.get(`http://localhost:3396/api/leaderboard/rating/:${player.rating}`);
    success(
      "updateLeaderboardQuery - successfully updated user leaderboard data",
      JSON.stringify(data.rows)
    );
    if (data.rows.length > 0) {
      let tempLeader;
      data.rows.forEach(record => {
        tempLeader = record;
        if(tempLeader.user_id !== player.user_id) {
          await axios.put("http://localhost:3396/api/leaderboard", {
            id: record.id,
            userId: player.id,
            rating: player.rating
          });
        }
        player = tempLeader;
      });
    }
  } catch (err) {
    error("updateLeaderboardQuery - error= ", err);
    throw new Error(err);
  }
}

export const updateLeaderboard = async ({ id, rating }) => {

}
