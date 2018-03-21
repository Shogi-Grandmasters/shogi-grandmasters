export const createMatchHelper = ({
  matchId,
  board,
  black,
  white,
  hand_black,
  hand_white
}) => {
  return `
    INSERT INTO matches
    VALUES ('${matchId}', '${board}', 0, 0,
    (SELECT id FROM users WHERE username='${black}'),
    (SELECT id FROM users WHERE username='${white}'), '${hand_black}', '${hand_white}')
    RETURNING id, board, turn
  `;
};

export const fetchMatchHelper = ({ matchId, userId }) => {
  if (userId) {
    return `
      SELECT id,black,white FROM matches
      WHERE status=0 AND (black='${userId}'
      OR white='${userId}')
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
  hand_black
}) => {
  return `
    UPDATE matches
    SET board='${board}', turn='${turn}', status='${status}', hand_white='${hand_white}', hand_black='${hand_black}'
    WHERE id='${matchId}'
    RETURNING id, board, turn, status, hand_white, hand_black
  `;
};
