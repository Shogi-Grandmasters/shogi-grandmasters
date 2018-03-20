export const addFriendHelper = ({ u_id, f_id, status = 0}) => {
  return `
    INSERT INTO friends (u_id, f_id, status)
    VALUES (${u_id}, ${f_id}, ${status})
    RETURNING u_id, f_id, status
  `;
};

export const fetchAllFriendsHelper = ({ u_id }) => {
  return `
    SELECT u.id, u.email, u.username, u.wins, u.losses, f.status, f.u_id
    FROM users AS u
      INNER JOIN friends AS f
      ON (u.id=f.f_id)
      WHERE f.u_id=${u_id}
  `;
};

export const delFriendHelper = ({ u_id, f_id }) => {
  return `
    DELETE FROM friends
    WHERE u_id=${u_id} AND f_id=${f_id}
    RETURNING u_id, f_id
  `;
}

export const updateFriendHelper = ({ u_id, f_id, status }) => {
  return `
    UPDATE friends
    SET status=${status}
    WHERE u_id=${u_id} AND f_id=${f_id}
    RETURNING u_id, f_id, status
  `;
}