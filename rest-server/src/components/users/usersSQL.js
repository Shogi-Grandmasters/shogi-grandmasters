export const findUsernameHelper = ({username}) => {
  return `
    SELECT id, email, username, wins, losses
    FROM users
    WHERE username='${username}'
  `;
};