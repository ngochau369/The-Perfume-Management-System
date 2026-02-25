import express from "express";
import {
  createBrand,
  deleteBrand,
  getBrandById,
  getBrands,
  updateBrand,
} from "../controller/brand.controller.js";
import { requireAdmin, verifyToken } from "../middlleware/auth.middleware.js";

const router = express.Router();

router.get("/", getBrands);
router.get("/:id", getBrandById);
router.post("/", verifyToken, requireAdmin, createBrand);
router.put("/:id", verifyToken, requireAdmin, updateBrand);
router.delete("/:id", verifyToken, requireAdmin, deleteBrand);

export default router;
