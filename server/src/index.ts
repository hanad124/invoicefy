import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import path from "path";

const PORT = process.env.PORT || 5000;

import router from "./router";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router());
app.use(express.static(path.join(__dirname, "../../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const MONGO_URI = process.env.MONGO_URI!;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);

mongoose.connection.on("error", (error) => {
  console.error(error);
});

mongoose.connection.on("open", () => {
  console.log("Connected to MongoDB");
});
