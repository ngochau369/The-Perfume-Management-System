import express from "express";
import {
  createPerfume,
  deletePerfume,
  getPerfumeById,
  getPerfumes,
  updatePerfume,
} from "../controller/perfume.controller.js";
import { addComment } from "../controller/comment.controller.js";
import {
  requireAdmin,
  requireMember,
  verifyToken,
} from "../middlleware/auth.middleware.js";

const router = express.Router();

router.get("/", getPerfumes);
router.get("/:id", getPerfumeById);
router.post("/", verifyToken, requireAdmin, createPerfume);
router.put("/:id", verifyToken, requireAdmin, updatePerfume);
router.delete("/:id", verifyToken, requireAdmin, deletePerfume);
router.post("/:id/comments", verifyToken, requireMember, addComment);

export default router;
