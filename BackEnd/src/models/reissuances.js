import mongoose from "mongoose";
const { Schema } = mongoose;

// Schema cho bảng cấp lại văn bằng
const reissuanceSchema = new mongoose.Schema(
  {
    reason: { type: String, required: true },
    dateRequest: { type: String, required: true },
    dateReissued: { type: String, required: true },
    status: { type: Boolean, required: true },
    expense: { type: String, required: true }, //phí cấp lại
    diploma: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Diplomas",
      required: true,
    },
  },
  { timestamps: true }
);

const Reissuances = mongoose.model("Reissuances", reissuanceSchema);

module.exports = Reissuances;
