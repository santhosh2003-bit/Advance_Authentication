import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./Db/connectDb.js";
import authRouter from "./router/auth.router.js";
const app = express();
dotenv.config();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.use("/api/router", authRouter);
app.listen(5500, () => {
  connectDb();
  console.log("Server is running on port 5000");
});
