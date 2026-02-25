import { Brand } from "../models/brand.model.js";

export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    return res.status(200).json(brands);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to fetch brands", error: error.message });
  }
};

export const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "brand not found" });
    }
    return res.status(200).json(brand);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to fetch brand", error: error.message });
  }
};

export const createBrand = async (req, res) => {
  try {
    const { brandName } = req.body;
    if (!brandName) {
      return res.status(400).json({ message: "brandName is required" });
    }
    const brand = await Brand.create({ brandName });
    return res.status(201).json(brand);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to create brand", error: error.message });
  }
};

export const updateBrand = async (req, res) => {
  try {
    const { brandName } = req.body;
    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      { brandName },
      { new: true },
    );
    if (!brand) {
      return res.status(404).json({ message: "brand not found" });
    }
    return res.status(200).json(brand);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to update brand", error: error.message });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "brand not found" });
    }
    return res.status(200).json({ message: "brand deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to delete brand", error: error.message });
  }
};
