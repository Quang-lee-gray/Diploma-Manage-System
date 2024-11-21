import mongoose from "mongoose";
const { Schema } = mongoose;

// Schema cho bảng Xác thực văn bằng
const verifySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    lecturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecturers",
      required: true,
    },
    dateVerify: { type: String, required: true },
    address: { type: String, required: true },
    result: { type: String, required: true },
    diploma: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Diplomas",
      required: true,
    },
  },
  { timestamps: true }
);

const Verifycations = mongoose.model("Verifycations", verifySchema);

module.exports = Verifycations;
