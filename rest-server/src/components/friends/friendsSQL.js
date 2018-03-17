export const addFriendHelper = ({ u_id, f_id, status = 0}) => {
  return `
    INSERT INTO friends (u_id, f_id, status)
    VALUES (${u_id}, ${f_id}, ${status})
    RETURNING u_id, f_id, status
  `;
};