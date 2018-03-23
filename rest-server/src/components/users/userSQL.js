export const findUserHelper = ({ username }) => {
   return `
    SELECT id, email, username, wins, losses
    FROM users
    WHERE username='${username}'
  `;
};

export const fetchUserHelper = ({ userId }) => {
  return `
    SELECT id, username, email, rating FROM users
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

export const updateUserHelper = ({ userId, rating }) => {
  return `
    UPDATE users
    SET rating = '${rating}'
    WHERE id = '${userId}'
    RETURNING id, username, rating
  `;
};

export const updateUserAviHelper = ({ id, avi, url }) => {
  return `
    UPDATE users
    SET avatar = '${avi + '/' + url}'
    WHERE id = '${id}'
    RETURNING id, username, rating, avatar
  `;
};
