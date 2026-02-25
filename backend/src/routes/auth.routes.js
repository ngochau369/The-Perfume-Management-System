import express from "express";
import { loginMember, registerMember } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", registerMember);
router.post("/login", loginMember);

export default router;
