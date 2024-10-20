const commentModel = require("../models/commentSchema");
const postModel = require("../models/postSchema");
const createComment = async (req, res) => {
  const { comment } = req.body;

  const newComment = new commentModel({
    comment: comment,
    commenter: req.payload.userId,
    postId: req.params.id,
  });

  try {
    const savedComment = await newComment.save();
    await postModel.findByIdAndUpdate(
      newComment.postId,
      { $push: { comments: savedComment } }
    );

    res.status(201).json({
      success: true,
      message: `Comment added`,
      comment: savedComment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  }
};

const deleteComment = (req, res) => {
  commentModel
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).json("no comment have this id");
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err.message);
    });
};

const getCommentsById = (req, res) => {
  commentModel
    .find({ postId: req.params.id })
    .populate("commenter")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};
module.exports = { createComment, deleteComment, getCommentsById };
