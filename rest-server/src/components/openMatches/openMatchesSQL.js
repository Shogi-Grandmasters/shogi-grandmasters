export const createOpenMatchHelper = ({ player1, player2 }) => {
  return `
    INSERT INTO open_matches (player1, player2)
    VALUES ('${player1}', '${player2}')
    RETURNING id, player1, player2, status
  `;
};

export const fetchOpenMatchHelper = ({ id }) => {
  return `
    SELECT * FROM open_matches WHERE player1='${id}' OR player2='${id}'
  `;
};

export const deleteOpenMatchHelper = ({ id }) => {
  return `
    DELETE FROM open_matches
    WHERE id='${id}'
    RETURNING player1
  `;
};
