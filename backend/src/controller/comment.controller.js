import { Comment } from "../models/comment.model.js";
import { Perfume } from "../models/perfume.model.js";

const commentPopulate = {
  path: "comments",
  populate: { path: "author", select: "name email" },
};

export const addComment = async (req, res) => {
  try {
    const { rating, content } = req.body;
    if (!rating || !content) {
      return res.status(400).json({ message: "rating and content required" });
    }

    const perfume = await Perfume.findById(req.params.id);
    if (!perfume) {
      return res.status(404).json({ message: "perfume not found" });
    }

    const ratingNumber = Number(rating);
    if (Number.isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 3) {
      return res.status(400).json({ message: "rating must be 1-3" });
    }

    const alreadyCommented = await Comment.findOne({
      perfume: perfume._id,
      author: req.user.userId,
    });
    if (alreadyCommented) {
      return res.status(409).json({ message: "already commented" });
    }

    const comment = await Comment.create({
      rating: ratingNumber,
      content,
      author: req.user.userId,
      perfume: perfume._id,
    });

    await Perfume.findByIdAndUpdate(perfume._id, {
      $push: { comments: comment._id },
    });

    const updated = await Perfume.findById(req.params.id)
      .populate("brand")
      .populate(commentPopulate);
    return res.status(201).json(updated);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to add comment", error: error.message });
  }
};
