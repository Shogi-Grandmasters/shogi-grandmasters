export const addFriendHelper = ({ u_id, f_id, status = 0}) => {
  const friend_key = u_id + f_id;
  return `
    INSERT INTO friends (u_id, f_id, status, friend_key)
    VALUES (${u_id}, ${f_id}, ${status}, ${friend_key})
    RETURNING u_id, f_id, status, friend_key
  `;
};

export const fetchAllFriendsHelper = ({ u_id }) => {
  return `
    SELECT u.id, u.email, u.username, u.wins, u.losses, u.avatar, f.status, f.u_id
    FROM users AS u
      INNER JOIN friends AS f
      ON (u.id=f.f_id)
      WHERE (f.u_id=${u_id} OR (u.id=${u_id} AND f.status=0))
  `;
};

export const delFriendHelper = ({ u_id, f_id }) => {
  return `
    DELETE FROM friends
    WHERE u_id in(${u_id}, ${f_id})
    AND f_id in(${u_id}, ${f_id})
    RETURNING u_id, f_id
  `;
}

export const updateFriendHelper = ({ u_id, f_id, status }) => {
  return `
    UPDATE friends
    SET status=${status}
    WHERE u_id in(${u_id}, ${f_id})
    AND f_id in(${u_id}, ${f_id})
    RETURNING u_id, f_id, status
  `;
}
//ocheyos
//WHERE ((f.u_id=${u_id} AND f.status=1) OR (u.id=${u_id} AND f.status=0))

//raymonds
//WHERE (f.u_id=${u_id} OR u.id=${u_id})
