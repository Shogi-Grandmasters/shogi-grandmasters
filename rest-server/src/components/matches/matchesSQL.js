export const createMatchHelper = ({ matchId, board, black, white, hand_black, hand_white }) => {
  return `
    INSERT INTO matches
    VALUES ('${matchId}', '${board}', 0, 1,
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
  turn,
  hand_white,
  hand_black
}) => {
  return `
    INSERT INTO matches (id, board, turn, hand_white, hand_black)
    VALUES ('${matchId}', '${board}', '${turn}', '${hand_white}', '${hand_black}')
    RETURNING id, board, turn, hand_white, hand_black
  `;
};
