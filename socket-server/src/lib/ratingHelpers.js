import eloRank from 'elo-rank';
import axios from 'axios';
import { success, error } from "./log.js";

const { REST_SERVER_URL } = process.env;

// new players start at 1000
// players below 2000 have K-factor of 32
// players between 2000 and 2500 have K-factor of 24
// players above 2500 have K-factor of 16

export const endMatch = ([winnerRating, loserRating], draw = false) => {
  const k = (rating) => {
    if (rating <= 1200) {
      return 40;
    } else if (rating <= 2000) {
      return 32;
    } else if (rating <= 2500) {
      return 24;
    } else {
      return 16;
    }
  }
    let elo;

  elo = new eloRank(k(winnerRating));
  let winnerExpected = elo.getExpected(winnerRating, loserRating);
  let winnerUpdated = elo.updateRating(winnerExpected, draw ? 0.5 : 1, winnerRating);

  elo = new eloRank(k(loserRating));
  let loserExpected = elo.getExpected(loserRating, winnerRating);
  let loserUpdated = elo.updateRating(loserExpected, draw ? 0.5 : 0, loserRating);

  winnerRating = winnerUpdated > 99 ? winnerUpdated : 100;
  loserRating = loserUpdated > 99 ? loserUpdated : 100;

  return [winnerRating, loserRating];
}

// TODO:  this needs updating
export const updateRating = async ({ id, rating }) => {
  try {
    const { rows } = await axios.put(`${REST_SERVER_URL}/api/users`, {
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

const asyncForEach = async (array, callback) => {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array);
  }
}

export const updateLeaderboard = async (player) => {
  let data;
  try {
    data = await axios.get(`${REST_SERVER_URL}/api/leaderboard/rating/${player.rating}`);
    success(
      "updateLeaderboardQuery - successfully updated user leaderboard data",
      JSON.stringify(data.rows)
    );
    if (data.rows.length > 0) {
      let tempLeader;
      await asyncForEach(data.rows, (record) => {
        tempLeader = record;
        if(tempLeader.user_id !== player.user_id) {
          axios.put(`${REST_SERVER_URL}/api/leaderboard`, {
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
