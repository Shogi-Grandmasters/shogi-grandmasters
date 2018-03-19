export const createMessageHelper = ({ matchId, message, username }) => {
  return `
    INSERT INTO messages (user_id, match_id, content)
    VALUES ((SELECT id FROM users WHERE username='${username}'), 
    '${matchId}', '${message}')
  `;
};

export const fetchMessageHelper = ({ matchId }) => {
  return `
    SELECT m.match_id, m.content, u.username FROM messages AS m, users AS u
    WHERE m.match_id='${matchId}' AND m.user_id=u.id
    ORDER BY m.id DESC LIMIT 20
  `;
};

// export const deleteMessageHelper = ({ matchId }) => {
//   return `
//     DELETE FROM messages
//     WHERE id='${matchId}'
//     RETURNING (SELECT username FROM users
//     WHERE id=player1)
//   `;
// };
