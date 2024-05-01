import dotenv from "dotenv";
dotenv.config();

const _config = {
  port: process.env.PORT,
  db: process.env.MONGO_URL,
};

export const config = Object.freeze(_config);
