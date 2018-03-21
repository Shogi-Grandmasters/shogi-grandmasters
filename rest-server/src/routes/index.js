import express from "express";

import authRouter from "../components/auth/authRouter";
import openMatchesRouter from "../components/openMatches/openMatchesRouter";
import matchesRouter from "../components/matches/matchesRouter";
import messagesRouter from "../components/messages/messagesRouter";
import friendsRouter from "../components/friends/friendsRouter";
import usersRouter from "../components/users/usersRouter";
import leaderboardRouter from "../components/leaderboard/leaderboardRouter";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/openmatches", openMatchesRouter);
router.use("/matches", matchesRouter);
router.use("/messages", messagesRouter);
router.use("/friends", friendsRouter);
router.use("/users", usersRouter);
router.use("/leaderboard", leaderboardRouter);

export default router;