import express from "express";
import {
  getAllMembers,
  getMyProfile,
  updateMyProfile,
} from "../controller/member.controller.js";
import {
  requireAdmin,
  requireSelf,
  verifyToken,
} from "../middlleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, requireAdmin, getAllMembers);
router.get("/me", verifyToken, getMyProfile);
router.put("/:id", verifyToken, requireSelf, updateMyProfile);

export default router;
