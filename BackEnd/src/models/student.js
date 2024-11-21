import mongoose from "mongoose";
const { Schema } = mongoose;

// Schema cho bảng Sinh viên
const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    codeStudent: {
      type: String,
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: Boolean, required: true },
    address: { type: String, required: true },
    CCCD: { type: String, required: true },
    nation: { type: String, required: true }, //dân tộc
    phoneNumber: { type: String, required: true },
    academicField: { type: String, required: true },
    yearOfAdmission: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Students = mongoose.model("Students", studentSchema);

module.exports = Students;
