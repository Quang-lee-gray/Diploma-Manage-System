import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let connect = await mongoose.connect(process.env.MONGODB_URL);
    if (connect) {
      console.log("Connect database successfully");
    }
  } catch (err) {
    console.log("Error connecting");
  }
};
module.exports = connectDB;
