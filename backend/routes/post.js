const express = require("express");
const postRouter = express.Router();
const {
  createPost,
  getAllPosts,
  getMyPosts,
  deletePostById,
  updatePostById,
  addRemoveReact,
  getPostById
} = require("../controllers/post");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
postRouter.get("/myPosts", authentication, getMyPosts);

postRouter.get("/:id",authentication, getPostById);
postRouter.post("/", authentication, createPost);
postRouter.get("/",authentication, getAllPosts);
postRouter.delete(
  "/:id",
  authentication,
  authorization("DELETE_POST"),
  deletePostById
);
postRouter.put("/:id", authentication, updatePostById);
postRouter.put("/reacts/:id", authentication, addRemoveReact);


module.exports = postRouter;
