import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
import "./feed.js";
let newsURL = process.env.NEWS_URL;

let app = express();
app.use(cors());

app.get("/", async (req, res) => {
  const response = await axios(newsURL);
  console.log(response.data);
  res.json(response.data);
});

app.listen("3002", () => {
  console.log("App is listening at http://localhost:3002");
});
