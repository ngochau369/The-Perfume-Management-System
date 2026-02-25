import { Member } from "../models/member.model.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../middlleware/jwt.js";

export const registerMember = async (req, res) => {
  try {
    const { email, password, name, YOB, gender } = req.body;
    if (
      !email ||
      !password ||
      !name ||
      YOB === undefined ||
      gender === undefined
    ) {
      return res.status(400).json({ message: "missing required fields" });
    }
    const existing = await Member.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const member = await Member.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      YOB,
      gender,
      isAdmin: false,
    });
    const safeMember = await Member.findById(member._id).select("-password");
    return res.status(201).json({ message: "registered", member: safeMember });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "register failed", error: error.message });
  }
};

export const loginMember = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "missing email or password" });
    }
    const member = await Member.findOne({ email: email.toLowerCase() }).select(
      "+password",
    );
    if (!member) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    const role = member.isAdmin ? "admin" : "member";
    const accessToken = generateAccessToken(member, role);
    const refreshToken = generateRefreshToken(member);
    const safeMember = await Member.findById(member._id).select("-password");
    return res.status(200).json({
      message: "login success",
      accessToken,
      refreshToken,
      member: safeMember,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "login failed", error: error.message });
  }
};
