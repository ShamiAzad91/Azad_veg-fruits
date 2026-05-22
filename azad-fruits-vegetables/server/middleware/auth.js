import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// ADMIN CHECK
export const isAdmin = async (req, res, next) => {
  try {
    console.log("decoded user:", req.user);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }
    // console.log("hello:", req.user.role);

    if (req.user.role !== 1) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Admin only",
      });
    }

    next();
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};