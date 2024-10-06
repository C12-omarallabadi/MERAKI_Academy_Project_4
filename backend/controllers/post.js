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
        if(result.length==0){
            res.status(404).json("no posts");


        }
        else{
        res.status(200).json(result)};
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};
const getMyPosts = (req, res) => {
    postModel
      .find({author:req.payload.userId})
      .then((result) => {
        if(result.length==0){
            res.status(404).json("no posts");


        }
        else{
        res.status(200).json(result)};
      })
      .catch((err) => {
        res.status(500).json(err.message);
      });
  };
  
module.exports = { createPost, getAllPosts,getMyPosts };
