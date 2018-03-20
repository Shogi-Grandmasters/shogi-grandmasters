export const fetchLeaderboardHelper = () => {
  return `
    SELECT *
    FROM leaderboard
    JOIN users ON leaderboard.user_id = users.id
  `;
};

export const fetchUserLeaderboardHelper = ({ placeId }) => {
  return `
    SELECT * FROM leaderboard
    WHERE id = '${placeId}'
    JOIN users ON leaderboard.user_id = users.id
  `;
};

export const addUserLeaderboardHelper = ({ userId }) => {
  return `
    INSERT INTO leaderboard (user_id)
    VALUES (${userId})
    RETURNING *
    JOIN users ON leaderboard.user_id = users.id
  `;
};

export const updateUserHelper = ({ userId,  placeId}) => {
  return `
    UPDATE leaderboard
    SET user_id = '${userId}'
    WHERE id = '${placeId}'
    RETURNING *
    JOIN users ON leaderboard.user_id = users.id
  `;
};
