export const createMatchHelper = ({
  matchId,
  board,
  black,
  white,
  hand_black,
  hand_white,
  type
}) => {
  return `
    BEGIN;
    INSERT INTO matches (id, board, black, white, hand_black, hand_white, type)
    VALUES ('${matchId}', '${board}', '${black}', '${white}', '${hand_black}', '${hand_white}', '${type || 0}')
    RETURNING id, board, turn, black, white, hand_black, hand_white, event_log, type;
    SELECT id,username,avatar,rating_unranked,rating_ranked,wins,losses FROM users WHERE id='${black}';
    SELECT id,username,avatar,rating_unranked,rating_ranked,wins,losses FROM users WHERE id='${white}';
    COMMIT;
  `;
};

export const fetchMatchHelper = ({ matchId, userId, black, white }) => {
  if (userId) {
    return `
      SELECT id,black,white,turn,modified FROM matches
      WHERE status=0 AND (black='${userId}'
      OR white='${userId}')
    `;
  } else if (black && white) {
    return `
      BEGIN;
      SELECT * FROM matches WHERE id='${matchId}';
      SELECT id,username,avatar,rating_unranked,rating_ranked,wins,losses FROM users WHERE id='${black}';
      SELECT id,username,avatar,rating_unranked,rating_ranked,wins,losses FROM users WHERE id='${white}';
      COMMIT;
    `;
  } else {
    return `
      SELECT * FROM matches WHERE id='${matchId}'
    `;
  }
};

export const fetchOpponentHelper = opponents => {
  return `
    SELECT id,username from users WHERE id = ANY(ARRAY[${opponents}])
  `;
};

export const updateMatchHelper = ({
  matchId,
  board,
  status,
  turn,
  hand_white,
  hand_black,
  event_log
}) => {
  return `
    UPDATE matches
    SET board='${board}', turn='${turn}', status='${status}', hand_white='${hand_white}', hand_black='${hand_black}', event_log='${event_log}'
    WHERE id='${matchId}'
    RETURNING id, board, turn, status, hand_white, hand_black
  `;
};

export const endMatchHelper = ({
  matchId,
  winner,
  loser,
  status
}) => {
  return `
    BEGIN;
    UPDATE matches SET winner='${winner.id}', status='${status}' WHERE id='${matchId}';
    UPDATE users SET wins=wins+1, rating_unranked='${winner.rating_unranked}', rating_ranked='${winner.rating_ranked}' WHERE id='${winner.id}';
    UPDATE users SET losses=losses+1, rating_unranked='${loser.rating_unranked}', rating_ranked='${loser.rating_ranked}' WHERE id='${loser.id}';
    COMMIT;
  `;
};

export const historyMatchHelper = ({ id }) => {
  return `
    SELECT * FROM matches
    WHERE (black=${id} OR white=${id})
  `;
};

