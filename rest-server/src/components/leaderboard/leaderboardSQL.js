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

export const addUserLeaderboardHelper = ({ userId, rating }) => {
  return `
    INSERT INTO leaderboard (user_id, rating)
    VALUES (${userId}, ${rating})
    RETURNING *
    JOIN users ON leaderboard.user_id = users.id
  `;
};

export const updateUserHelper = ({ placeId, userId, rating}) => {
  return `
    UPDATE leaderboard
    SET user_id, rating = '${userId}', '${rating}'
    WHERE id = '${placeId}'
    RETURNING *
    JOIN users ON leaderboard.user_id = users.id
  `;
};

export const fetchLeaderboardFromRating = ({ rating }) => {
  return `
    SELECT * FROM leaderboard
    WHERE rating < '${rating}'
  `;
};
