import express from "express";
import cors from "cors";
import { config } from "./utils/config.util.js";
import mongoose from "mongoose";

const app = express();
const PORT = config.port || 8000;

mongoose
  .connect(config.db)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error(err));

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).send({
    success: false,
    statusCode,
    message,
  });
});
