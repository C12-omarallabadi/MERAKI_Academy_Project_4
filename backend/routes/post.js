const express = require("express");
const postRouter = express.Router();
const {
  createPost,
  getAllPosts,
  getMyPosts,
  deletePostById,
  updatePostById,
  addRemoveReact
} = require("../controllers/post");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

postRouter.post("/", authentication, authorization("CREATE_POST"), createPost);
postRouter.get("/", getAllPosts);
postRouter.get("/myPosts", authentication, getMyPosts);
postRouter.delete(
  "/:id",
  authentication,
  authorization("DELETE_POST"),
  deletePostById
);
postRouter.put("/:id", authentication, updatePostById);
postRouter.put("/reacts/:id", authentication, addRemoveReact);


module.exports = postRouter;
