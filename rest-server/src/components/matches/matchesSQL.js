export const createMatchHelper = ({
  matchId,
  board,
  black,
  white,
  hand_black,
  hand_white
}) => {
  return `
    BEGIN;
    INSERT INTO matches
    VALUES ('${matchId}', '${board}', 0, 0,
    '${black}', '${white}', '${hand_black}', '${hand_white}')
    RETURNING id, board, turn, black, white, hand_black, hand_white, event_log;
    SELECT id,username,avatar,rating,wins,losses FROM users WHERE id='${black}';
    SELECT id,username,avatar,rating,wins,losses FROM users WHERE id='${white}';
    COMMIT;
  `;
};

export const fetchMatchHelper = ({ matchId, userId, black, white }) => {
  if (userId) {
    return `
      SELECT id,black,white FROM matches
      WHERE status=0 AND (black='${userId}'
      OR white='${userId}')
    `;
  } else {
    return `
      BEGIN;
      SELECT * FROM matches WHERE id='${matchId}';
      SELECT id,username,avatar,rating,wins,losses FROM users WHERE username='${black}';
      SELECT id,username,avatar,rating,wins,losses FROM users WHERE username='${white}';
      COMMIT;
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
