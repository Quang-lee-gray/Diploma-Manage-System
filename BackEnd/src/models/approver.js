import mongoose from "mongoose";
const { Schema } = mongoose;

// Schema cho bảng Giảng viên
const approverSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    codeApprover: {
      type: String,
      required: true,
      unique: true,
    },
    falculty: { type: String, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    position: { type: String, required: true }, //chuc vu
    gender: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Approvers = mongoose.model("Approvers", approverSchema);

module.exports = Approvers;
