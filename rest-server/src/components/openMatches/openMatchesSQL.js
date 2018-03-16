export const createOpenMatchHelper = ({ matchId, player1 }) => {
  return `
    INSERT INTO open_matches
    VALUES ('${matchId}', (SELECT id FROM users WHERE username='${player1}'))
    RETURNING id, player1
  `;
};

export const fetchOpenMatchHelper = () => {
  return `
    SELECT * FROM open_matches
  `;
};
