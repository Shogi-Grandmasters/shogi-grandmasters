import eloRank from 'elo-rank';

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
  winner.rating = elo.updateRating(winnerExpected, draw ? 0.5 : 1, winner.rating);

  if (loser <= 2000) {
    elo = new eloRank(32);
  } else if (loser <= 2500) {
    elo = new eloRank(24);
  } else {
    elo = new eloRank(16);
  }
  let loserExpected = elo.getExpected(loser.rating, winner.rating);
  loser.rating = elo.updateRating(loserExpected, draw ? 0.5 : 1, loser.rating);

  return [winner, loser]
}
