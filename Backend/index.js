import express from "express";
import userRouter from "./routes/users.js";
import movieRouter from "./routes/movie.js";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiProxy = createProxyMiddleware({
  target: 'https://movie-app-tmdb-api-production-407d.up.railway.app', // Replace with your API base URL
  changeOrigin: true,
});

app.use("/api", apiProxy);

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

app.use("/", userRouter);
app.use("/", movieRouter);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  connect();
  console.log(`Hi Boss, we are online now at ${port}`);
});
