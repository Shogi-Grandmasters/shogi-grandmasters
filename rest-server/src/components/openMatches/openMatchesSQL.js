export const createOpenMatchHelper = ({ matchId, player1 }) => {
  return `
    INSERT INTO open_matches
    VALUES ('${matchId}', (SELECT id FROM users WHERE username='${player1}'))
    RETURNING id, player1
  `;
};

export const fetchOpenMatchHelper = () => {
  return `
    SELECT m.id,u.username FROM open_matches AS m, users AS u
    WHERE m.player1=u.id
  `;
};

export const deleteOpenMatchHelper = ({matchId}) => {
  return `
    DELETE FROM open_matches
    WHERE id='${matchId}'
    RETURNING (SELECT username FROM users
    WHERE id=player1)
  `;
};
