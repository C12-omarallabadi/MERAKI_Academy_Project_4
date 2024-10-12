const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  post: { type: String, required: true },
  image: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});
module.exports = mongoose.model("Post", postSchema);
