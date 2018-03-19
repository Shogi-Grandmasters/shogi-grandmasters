import express from "express";

import authRouter from "../components/auth/authRouter";
import openMatchesRouter from "../components/openMatches/openMatchesRouter";
import matchesRouter from "../components/matches/matchesRouter";
import messagesRouter from "../components/messages/messagesRouter";
import userRouter from "../components/users/userRouter"

const router = express.Router();

router.use("/auth", authRouter);
router.use("/openmatches", openMatchesRouter);
router.use("/matches", matchesRouter);
router.use("/messages", messagesRouter);
router.use("/users", userRouter);

export default router;
