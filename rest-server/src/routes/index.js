import express from "express";

import authRouter from "../components/auth/authRouter";
import matchesRouter from "../components/matches/matchesRouter";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/matches", matchesRouter);

export default router;
