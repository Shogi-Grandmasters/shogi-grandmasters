export const createMatchHelper = ({ matchId, board, black, white, hand_black, hand_white }) => {
  return `
    INSERT INTO matches
    VALUES ('${matchId}', '${board}', 0, 0,
    (SELECT id FROM users WHERE username='${black}'),
    (SELECT id FROM users WHERE username='${white}'), '${hand_black}', '${hand_white}')
    RETURNING id, board, turn
  `;
};

export const fetchMatchHelper = ({ matchId }) => {
  return `
    SELECT * FROM matches WHERE id='${matchId}'
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
