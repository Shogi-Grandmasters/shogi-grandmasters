export const signUpHelper = ({ email, username, password }) => {
  return `
    INSERT INTO users (email, username, password, rating)
    VALUES ('${email}', '${username}', '${password}', '1000')
    RETURNING id, email, username, rating
  `;
};

export const loginHelper = ({ username }) => {
  return `
    SELECT id, email, username, password
    FROM users
    WHERE username='${username}'
  `;
};
