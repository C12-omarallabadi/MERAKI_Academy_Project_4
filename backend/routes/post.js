const express = require("express");
const postRouter = express.Router();
const {createPost,getAllPosts} = require("../controllers/post");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

postRouter.post("/", authentication, authorization("CREATE_POST"), createPost);
postRouter.get("/", authentication, getAllPosts);

module.exports = postRouter;
