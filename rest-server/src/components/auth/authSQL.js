export const signUpHelper = ({ email, username, password, avatar = "v1521764208/jmspueczx7ad6jsumnjd.png" }) => {
  return `
    INSERT INTO users (email, username, password, rating, avatar)
    VALUES ('${email}', '${username}', '${password}', '1000', '${avatar}')
    RETURNING id, email, username, rating
  `;
};

export const loginHelper = ({ username }) => {
  return `
    SELECT *
    FROM users
    WHERE username='${username}'
  `;
};

export const passwordHelper = ({ username, new_password }) => {
  return `
    UPDATE users
    SET password='${new_password}'
    WHERE username='${username}'
    RETURNING *
  `;
}