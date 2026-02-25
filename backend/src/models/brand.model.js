import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    brandName: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const Brand = mongoose.model("Brands", brandSchema);
