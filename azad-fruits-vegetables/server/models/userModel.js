import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role:{
        type:Number,
        default:"0" // 0-user, 1-admin
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      set: (v) => {
        v = v.replace(/\D/g, "");
        if (v.length === 10) return "+91" + v;
        if (v.startsWith("91")) return "+" + v;
        return v;
      },
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
