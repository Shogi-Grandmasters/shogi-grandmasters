import { CronJob } from "cron";
import { db, redisCache } from "../config/database/";
import { fetchLeaderboardHelper } from "../components/leaderboard/leaderboardSQL";
import { success, error } from "./log";

const updateLeaderboard = async () => {
  try {
    const queryString = fetchLeaderboardHelper();
    const { rows } = await db.queryAsync(queryString);
    const unrankedLeaderboard = rows
      .sort((a, b) => b.rating_unranked - a.rating_unranked)
      .slice(0, 10);
    const rankedLeaderboard = rows
      .sort((a, b) => b.rating_ranked - a.rating_ranked)
      .slice(0, 10);
  
    await redisCache.set("unrankedLeaderboard",JSON.stringify(unrankedLeaderboard));
    await redisCache.set("rankedLeaderboard", JSON.stringify(rankedLeaderboard));
  
    success('leaderboard successfully updated');
  } catch (err) {
    error("updateLeaderboard - error= ", err);
  }
};

updateLeaderboard();

const job = new CronJob('00 59 * * * *', () => {
  updateLeaderboard();
}, null, true, 'America/Los_Angeles');
