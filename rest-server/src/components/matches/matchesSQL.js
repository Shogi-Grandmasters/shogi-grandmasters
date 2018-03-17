export const createMatchHelper = ({ matchId, board, black, white }) => {
  return `
    INSERT INTO matches
    VALUES ('${matchId}', '${board}', 0, 1,
    (SELECT id FROM users WHERE username='${black}'),
    (SELECT id FROM users WHERE username='${white}'), '""', '""')
    RETURNING id, board, turn
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
