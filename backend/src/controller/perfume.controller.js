import { Perfume } from "../models/perfume.model.js";

const commentPopulate = {
  path: "comments",
  populate: { path: "author", select: "name email" },
};

export const getPerfumes = async (req, res) => {
  try {
    const perfumes = await Perfume.find()
      .populate("brand")
      .populate(commentPopulate);
    return res.status(200).json(perfumes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to fetch perfumes", error: error.message });
  }
};

export const getPerfumeById = async (req, res) => {
  try {
    const perfume = await Perfume.findById(req.params.id)
      .populate("brand")
      .populate(commentPopulate);
    if (!perfume) {
      return res.status(404).json({ message: "perfume not found" });
    }
    return res.status(200).json(perfume);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to fetch perfume", error: error.message });
  }
};

export const createPerfume = async (req, res) => {
  try {
    const perfume = await Perfume.create(req.body);
    const created = await Perfume.findById(perfume._id)
      .populate("brand")
      .populate(commentPopulate);
    return res.status(201).json(created);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to create perfume", error: error.message });
  }
};

export const updatePerfume = async (req, res) => {
  try {
    const perfume = await Perfume.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("brand")
      .populate(commentPopulate);
    if (!perfume) {
      return res.status(404).json({ message: "perfume not found" });
    }
    return res.status(200).json(perfume);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to update perfume", error: error.message });
  }
};

export const deletePerfume = async (req, res) => {
  try {
    const perfume = await Perfume.findByIdAndDelete(req.params.id);
    if (!perfume) {
      return res.status(404).json({ message: "perfume not found" });
    }
    return res.status(200).json({ message: "perfume deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to delete perfume", error: error.message });
  }
};
