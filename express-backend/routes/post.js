const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");

const privateKey = process.env.JWT_PRIVATE_KEY;
/*const privateKey = "";*/

router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

router.post("/", async function (req, res) {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.payload.id,
    complete: req.body.complete,
    dateCompleted: req.body.dateCompleted,
    dateCreated: req.body.dateCreated,
  });

  return post
    .save()
    .then((savedPost) => {
      return res.status(201).json({
        _id: savedPost._id,
        title: savedPost.title,
        content: savedPost.content,
        author: savedPost.author,
        complete: savedPost.complete,
        dateCompleted: savedPost.dateCompleted,
        dateCreated: savedPost.dateCreated,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.get("/", async function (req, res, next) {
  const posts = await Post.find().where("author").equals(req.payload.id).exec();
  return res.status(200).json({ posts: posts });
});

router.delete("/id", async function (req, res, next) {
  const posts = await Post.delete().where("_id").equals(req.params.id).exec();
  return res.status(200).json(posts);
});

router.patch("/update/id", async function (req, res, next) {
  const posts = await Post.updateOne(
    { _id: req.body._id },
    { dateCompleted: req.body.dateCompleted, complete: req.body.complete }
  ).exec();
  return res.status(200).json(posts);
});

module.exports = router;
