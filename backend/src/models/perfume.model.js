import mongoose from "mongoose";

const perfumeSchema = new mongoose.Schema(
  {
    perfumeName: { type: String, required: true, trim: true },
    uri: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    concentration: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    ingredients: { type: String, required: true, trim: true },
    volume: { type: Number, required: true },
    targetAudience: { type: String, required: true, trim: true },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brands",
      required: true,
    },
  },
  { timestamps: true },
);

export const Perfume = mongoose.model("Perfumes", perfumeSchema);
