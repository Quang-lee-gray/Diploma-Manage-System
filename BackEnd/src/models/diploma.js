import mongoose from "mongoose";
const { Schema } = mongoose;

// Schema cho bảng Văn bằng
const diplomaSchema = new mongoose.Schema(
  {
    codeDiploma: {
      type: String,
      required: true,
      unique: true,
    },
    issueDate: { type: String, required: true },
    specialize: { type: String, required: true }, //chuyên ngành
    typeOfTraining: { type: String, required: true }, //Loại hình đào tạo
    trainingFacility: { type: String, required: true }, //Cơ sở đào tạo
    rank: { type: String, required: true }, //xếp loại
    note: { type: String, required: true }, //ghi chú
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
      required: true,
    },
  },
  { timestamps: true }
);

const Diplomas = mongoose.model("Diplomas", diplomaSchema);

module.exports = Diplomas;
