const postModel = require("../models/postSchema");
const createPost = (req, res) => {
  const { post } = req.body;
  const newPost = new postModel({ post: post, author: req.payload.userId });
  newPost
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};
const getAllPosts = (req, res) => {
  postModel
    .find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};
module.exports = { createPost, getAllPosts };
