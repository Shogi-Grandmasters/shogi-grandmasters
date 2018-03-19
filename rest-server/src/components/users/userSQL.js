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
