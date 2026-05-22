import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    // console.log(req.body);
    let { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !phone || !address) {
      return res
        .status(422)
        .json({  msg: "Plz include all the fields", status: "failed" });
    }

    // 2. Name length validation
    if (name.trim().length < 3) {
      return res.status(400).json({
        msg: "Name must be at least 3 characters long",
        status: "failed",
      });
    }
    // 3. Name length validation
    if (password.trim().length < 5) {
      return res.status(400).json({
        msg: "password must be at least 5 characters long",
        status: "failed",
      });
    }
    // 4️ Phone validation (+91)
    phone = phone.replace(/\D/g, ""); // remove non-numbers

    if (phone.length !== 10) {
      return res.status(400).json({
        msg: "Phone number must be 10 digits",
        status: "failed",
      });
    }

    phone = "+91" + phone;

    email = email.toLowerCase().trim();
    //5 check existinguser

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({  msg: "user already exists", status: "failed" });
    }

    //6 hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //crate new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    await user.save();
    user.password = undefined;

    return res.status(201).json({
      msg: "user registerd successfully",
      status: "success",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message,
      msg: "Something went wrong ",
      status: "failed",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({  msg: "Plz include all the fields", status: "failed" });
    }

    //check user exist or not
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
       
        msg: "User not found! Registered first",
        status: "failed",
      });
    }
    // 3. compare password

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({  msg: "Invalid credentials", status: "failed" });
    }

    //generate token

    const token = jwt.sign({ _id: existingUser._id ,role:existingUser.role,email:existingUser.email}, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    return res.status(200).json({
      msg: "Login Successfully",
      status: "success",
      token,
      user: {
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        phone: existingUser.phone,
      },
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message,
      msg: "Something went wrong ",
      status: "failed",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, password, address } = req.body;

    const user = await User.findById(req.user._id);

    if (password && password.length < 6) {
      return res.status(400).json({
        error: "Password should be at least 6 characters",
      });
    }

    let hashedPassword;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        address: address || user.address,
      },
      { new: true }
    );

    updated.password = undefined;

    res.json(updated);
  } catch (err) {
    return res.status(500).json({
      err: err.message,
      msg: "Something went wrong",
      status: "failed",
    });
  }
};