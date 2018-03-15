import express from "express";

import authRouter from "../components/auth/authRouter";

const router = express.Router();

router.use("/auth", authRouter);

export default router;
