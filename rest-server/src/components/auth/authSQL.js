export const signUpHelper = ({ email, username, password }) => {
  return `
    INSERT INTO users (email, username, password)
    VALUES ('${email}', '${username}', '${password}')
    RETURNING id, email, username
  `;
};

export const loginHelper = ({ username }) => {
  return `
    SELECT id, email, username, password
    FROM users
    WHERE email='${username}'
  `;
};
