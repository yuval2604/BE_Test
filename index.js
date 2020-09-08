const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Default Page");
});

app.get("/tweets", (req, res) => {
  res.send("tweets GET");
});

app.get("/retweets", (req, res) => {
  res.send("retweets GET");
});

app.post("/tweets", (req, res) => {
  res.send("tweets POST");
});
app.post("/tweets/:id/likes", (req, res) => {
  res.send("tweets/:id/likes POST");
});
app.post("/tweets/:id/retweet", (req, res) => {
  res.send("tweets/:id/retweets POST");
});

app.listen(8000);
