import express from "express";
import bodyParser from "body-parser";
import configView from "./config/configViewEngine.js";
import router from "./routes/web.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";
import morgan from "morgan";
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;
const localhost = process.env.LOCALHOST || "localhost";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("common"));
//config
configView(app);
//database
connectDB();
//cors
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend origin
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

app.use(router);

app.listen(port, localhost);
