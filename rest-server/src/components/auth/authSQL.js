export const signUpHelper = ({ email, username, password, avatar = "v1521764208/jmspueczx7ad6jsumnjd.png" }) => {
  return `
    INSERT INTO users (email, username, password, avatar)
    VALUES ('${email}', '${username}', '${password}', '${avatar}')
    RETURNING id, email, username, rating_unranked, rating_ranked
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