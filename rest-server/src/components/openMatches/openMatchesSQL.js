export const createOpenMatchHelper = ({ player1, player2 }) => {
  return `
    INSERT INTO open_matches (player1, player2)
    VALUES ('${player1}', '${player2}')
    RETURNING id, player1, player2, status
  `;
};

export const fetchOpenMatchHelper = () => {
  return `
    SELECT * FROM open_matches
  `;
};

export const deleteOpenMatchHelper = ({matchId}) => {
  return `
    DELETE FROM open_matches
    WHERE id='${matchId}'
    RETURNING player1
  `;
};
