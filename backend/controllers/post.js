const postModel = require("../models/postSchema");
const createPost = (req, res) => {
  const { post, author } = req.body;
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
    .populate("author")
    .then((result) => {
      if (result.length == 0) {
        res.status(404).json("no posts");
      } else {
        res.status(200).json(result);
      }
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};
const getMyPosts = (req, res) => {
  postModel
    .find({ author: req.payload.userId }).populate("author")
    .then((result) => {
      if (result.length == 0) {
        res.status(404).json("no posts");
      } else {
        res.status(200).json(result);
      }
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

const deletePostById = (req, res) => {
  postModel
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).json("no post have this id");
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err.message);
    });
};

const updatePostById = (req, res) => {
  postModel
    .findByIdAndUpdate(req.params.id, { post: req.body.post })
    .then((result) => {
      if (!result) {
        res.status(404).json("no post have this id");
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err.message);
    });
};
const addReact = (req, res) => {
  postModel
    .findByIdAndUpdate(req.params.id, { $push: { react: req.payload.userId} })
    .then((result) => {
      if (!result) {
        res.status(404).json("no post have this id");
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err.message);
    });
};
const getPostById = (req, res) => {
  postModel
    .findOne({ _id: req.params.id })
    .populate("author")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err.message);
    });
};
const getPostsById = (req, res) => {
  postModel
    .find({ author: req.params.id })
    
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err.message);
    });
};
module.exports = {
  createPost,
  getAllPosts,
  getMyPosts,
  deletePostById,
  updatePostById,
  addReact,
  getPostById,
  getPostsById,

};
