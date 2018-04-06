import { escape } from "lodash";

export const createMessageHelper = ({ matchId, message, userId, friendId }) => {
  return `
    INSERT INTO messages (user_id, friend_id, match_id, content)
    VALUES ('${userId}', '${friendId}', '${matchId}', '${escape(message)}')
  `;
};

export const fetchMessageHelper = ({ userId, friendId }) => {
  if (userId) {
    return `
      SELECT m.match_id, m.content, m.user_id, m.friend_id, m.created, u.username FROM messages AS m, users AS u
      WHERE (m.user_id='${userId}' OR m.friend_id='${userId}') AND m.user_id=u.id
      ORDER BY m.id DESC
    `;
  } else {
    return `
      SELECT m.match_id, m.content, m.user_id, m.friend_id, m.created, u.username FROM messages AS m, users AS u
      WHERE m.match_id='home' AND m.user_id=m.friend_id AND m.user_id=u.id
      ORDER BY m.id DESC LIMIT 20
    `;
  }
};

// export const deleteMessageHelper = ({ matchId }) => {
//   return `
//     DELETE FROM messages
//     WHERE id='${matchId}'
//     RETURNING (SELECT username FROM users
//     WHERE id=player1)
//   `;
// };
