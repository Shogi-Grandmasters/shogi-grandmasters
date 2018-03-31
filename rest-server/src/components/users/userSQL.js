export const findUserHelper = ({ username }) => {
  return `
    SELECT id, email, username, wins, losses, avatar
    FROM users
    WHERE username='${username}'
  `;
};

export const fetchUserHelper = ({ userId }) => {
  return `
    SELECT id, username, email, rating_unranked, rating_ranked, avatar FROM users
    WHERE id='${userId}'
  `;
};

export const deleteUserHelper = ({ userId }) => {
  return `
    DELETE FROM users
    WHERE id='${userId}'
    RETURNING *
  `;
};

export const updateUserHelper = ({ userId, rating, ranked }) => {
  let ratingType = ranked ? 'rating_ranked' : 'rating_unranked';
  return `
    UPDATE users
    SET '${ratingType}' = '${rating}'
    WHERE id = '${userId}'
    RETURNING id, username, '${ratingType}'
  `;
};

export const updateUserAviHelper = ({ id, avi, url }) => {
  return `
    UPDATE users
    SET avatar = '${avi + "/" + url}'
    WHERE id = '${id}'
    RETURNING id, username, rating_unranked, rating_ranked, avatar
  `;
};
