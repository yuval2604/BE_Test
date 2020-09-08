const express = require("express");
const app = express();

// IDK if needed
var bodyParser = require("body-parser"),
  passport = require("passport"),
  LocalStrategy = require("passport-local");

// mongo connection
const mongoose = require("mongoose");
const getSecret = require("./secret");

// schema
const Tweets = require("./tweets");
const Retweets = require("./retweets");

// Data from Yuval's Project
const User = require("./user");
mongoose.connect("mongodb://mac:Aa1234@ds233596.mlab.com:33596/goodbrain");

app.get("/", (req, res) => {
  //res.send("Default Page");
  //res.json({ message: "HELLOW WORLDUUHHHH" });

  User.find((err, data) => {
    //console.log("hello");
    if (err) return res.json({ success: True, error: err });
    console.log(data[0]); //{ _id: 5ec56612aeeb4f4b1b9e0782, username: 'harry', __v: 0 }
    return res.send({ data: data });
  });

  //res.send("Default Page");
});

app.get("/tweets", (req, res) => {
  res.send("tweets GET");
  Tweets.find((err, {}) => {
    if (err) return res.json({ success: True, error: err });
    return res.json({ data: data });
  });
});

app.get("/retweets", (req, res) => {
  res.send("retweets GET");
  Retweets.find((err, {}) => {
    if (err) return res.json({ success: True, error: err });
    return res.json({ data: data });
  });
});

//Create new tweet
app.post("/tweets", (req, res) => {
  res.send("tweets POST");
  const { content, username } = req.body;
  const tweet = create_tweet(content, username);
  Tweets.create(tweet, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to main page
      console.log("success");
    }
  });
});

// add like to tweet
app.post("/tweets/:id/likes", (req, res) => {
  var Tweet_id = req.params.id;
  const { username } = req.body;
  res.send("tweets/:id/likes POST");
  Tweets.findOneAndUpdate(
    { id: Tweet_id },
    { likes_count: likes_count + 1 },
    { new: true },
    (err) => {
      if (err)
        return (
          console.log("update err", err) &
          res.json({ success: false, error: err })
        );
      return res.json({ success: true });
    }
  );
});

// add Retweet to Tweet

// 1 - find the
// 2 - update retweets_count in tweet
// 3 - create a new retweet
app.post("/tweets/:id/retweet", (req, res) => {
  var tweet_id = req.params.id;
  const { retweet_username } = req.body;

  res.send("tweets/:id/retweets POST");
  // update retweets_count
  Tweets.findOneAndUpdate(
    { id: tweet_id },
    { retweets_count: retweets_count + 1 },
    { new: true },
    (err) => {
      if (err)
        return (
          console.log("update err", err) &
          res.json({ success: false, error: err })
        );
      return res.json({ success: true });
    }
  );
  // get tweet_user
  var tweet_user = Tweets.findOne({ id: tweet_id }).tweet_user;

  //content, tweet_id, tweet_user, retweet_user
  const retweet = create_Retweet(
    content,
    tweet_id,
    tweet_user,
    retweet_username
  );
  Retweets.create(retweet, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to main page
      console.log("success");
    }
  });
});

function create_tweet(content, username) {
  const tweet = new Tweets();
  tweet.content = content;
  tweet.username = username;
  tweet.likes_count = 0;
  tweet.timestamp = new Date(Date.now()).toLocaleString();
  tweet.retweets_count = 0;
  return tweet;
}

function create_Retweet(content, tweet_id, tweet_user, retweet_user) {
  const retweet = new Retweets();
  retweet.content = content;
  retweet.timestamp = new Date(Date.now()).toLocaleString();
  retweet.tweet_id = tweet_id;
  retweet.tweet_user = tweet_user;
  retweet.retweet_user = retweet_user;
  return tweet;
}

//Launch listening server on port 8081
app.listen(8081, function () {
  console.log("app listening on port 8081!");
});
