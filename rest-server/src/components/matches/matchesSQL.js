export const createMatchHelper = ({ matchId, board, player1, player2 }) => {
  return `
    INSERT INTO matches
    VALUES ('${matchId}', '${board}', 0, 1, '""', '""', 
    (SELECT id FROM users WHERE username='${player1}'), 
    (SELECT id FROM users WHERE username='${player2}'))
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
