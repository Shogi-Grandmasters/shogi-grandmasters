import express from "express";

import authRouter from "../components/auth/authRouter";
import openMatchesRouter from "../components/openMatches/openMatchesRouter";
import matchesRouter from "../components/matches/matchesRouter";
import messagesRouter from "../components/messages/messagesRouter";
<<<<<<< HEAD
import userRouter from "../components/users/userRouter"
import friendsRouter from "../components/friends/friendsRouter";
import usersRouter from "../components/users/usersRouter";
=======
import friendsRouter from "../components/friends/friendsRouter";

>>>>>>> [acct] Saving prior to rebase, working on form validation for search users, add friend

const router = express.Router();

router.use("/auth", authRouter);
router.use("/openmatches", openMatchesRouter);
router.use("/matches", matchesRouter);
router.use("/messages", messagesRouter);
<<<<<<< HEAD
router.use("/users", userRouter);
router.use("/friends", friendsRouter);
router.use("/users", usersRouter);
=======
router.use("/friends", friendsRouter);
>>>>>>> [acct] Saving prior to rebase, working on form validation for search users, add friend

export default router;
