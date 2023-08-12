import Parser from "rss-parser";
import express from "express";
import cors from "cors";

let parser = new Parser();
let feedURL = "https://netflixtechblog.com/feed";
// let feedURLs = [
//   "https://netflixtechblog.com/feed",
//   "https://dev.to/feed",
//   "https://www.reddit.com/.rss",
// ];

let articles = [];

// const parse = feedURLs.map(async (url) => {
//   let feed = await parser.parseURL(url);
//   //   console.log(feed.title);
//   feed.items.forEach((item) => {
//     // console.log(`${item.title}\n${item.link}\n\n`);
//     return articles.push({ item });
//   });
// });

const parse = async (url) => {
  let feed = await parser.parseURL(url);
  //   console.log(feed.title);
  feed.items.forEach((item) => {
    // console.log(`${item.title}\n${item.link}\n\n`);
    articles.push({ item });
  });
};

parse(feedURL);

let app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send(articles);
});

app.listen("3003", () => {
  console.log("App is listening at http://localhost:3003");
});
