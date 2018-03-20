export const signUpHelper = ({ email, username, password }) => {
  return `
    INSERT INTO users (email, username, password)
    VALUES ('${email}', '${username}', '${password}')
    RETURNING id, email, username
  `;
};

export const loginHelper = ({ username }) => {
  return `
    SELECT id, email, username, password, wins, losses
    FROM users
    WHERE username='${username}'
  `;
};
