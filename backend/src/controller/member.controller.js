import { Member } from "../models/member.model.js";

export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().select("-password");
    return res.status(200).json(members);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to fetch members", error: error.message });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const member = await Member.findById(req.user.userId).select("-password");
    if (!member) {
      return res.status(404).json({ message: "member not found" });
    }
    return res.status(200).json(member);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to fetch profile", error: error.message });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const { name, YOB, gender, password } = req.body;
    const member = await Member.findById(req.params.id).select("+password");
    if (!member) {
      return res.status(404).json({ message: "member not found" });
    }
    if (name !== undefined) member.name = name;
    if (YOB !== undefined) member.YOB = YOB;
    if (gender !== undefined) member.gender = gender;
    if (password) member.password = password;

    await member.save();
    const safeMember = await Member.findById(member._id).select("-password");
    return res.status(200).json({ message: "updated", member: safeMember });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to update profile", error: error.message });
  }
};
