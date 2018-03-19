import express from "express";

import authRouter from "../components/auth/authRouter";
import openMatchesRouter from "../components/openMatches/openMatchesRouter";
import matchesRouter from "../components/matches/matchesRouter";
<<<<<<< HEAD
import messagesRouter from "../components/messages/messagesRouter";
import friendsRouter from "../components/friends/friendsRouter";
import usersRouter from "../components/users/usersRouter";
=======
import userRouter from "../components/users/userRouter"
>>>>>>> users routes created, updates rankings on database

const router = express.Router();

router.use("/auth", authRouter);
router.use("/openmatches", openMatchesRouter);
router.use("/matches", matchesRouter);
<<<<<<< HEAD
router.use("/messages", messagesRouter);
router.use("/friends", friendsRouter);
router.use("/users", usersRouter);
=======
router.use("/users", userRouter);
>>>>>>> users routes created, updates rankings on database

export default router;