const express = require("express");
const postRouter = express.Router();
const {
  createPost,
  getAllPosts,
  getMyPosts,
  deletePostById,
  updatePostById,
  addReact,
  getPostById,
  getPostsById

} = require("../controllers/post");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
postRouter.get("/myPosts", authentication, getMyPosts);
postRouter.get("/user/:id",authentication, getPostsById);

postRouter.get("/:id",authentication, getPostById);

postRouter.post("/", authentication, createPost);
postRouter.get("/",authentication, getAllPosts);
postRouter.delete(
  "/:id",
  authentication,
  authorization("DELETE_POST"),
  deletePostById
);
postRouter.patch("/:id",authentication, addReact);

postRouter.put("/:id", authentication, updatePostById);


module.exports = postRouter;
