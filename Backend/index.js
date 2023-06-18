import express from "express";
import userRouter from "./routes/users.js";
import movieRouter from "./routes/movie.js";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
  origin: "https://layar-tancep.netlify.app/",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("connected MONGO DB");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!!");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!!");
});

app.use("/", cors(corsOptions), userRouter);
app.use("/", cors(corsOptions), movieRouter);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  connect();
  console.log(`Hi Boss, we are online now at ${port}`);
});
