const express = require("express");
const postRouter = express.Router();
const {createPost,getAllPosts,getMyPosts} = require("../controllers/post");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

postRouter.post("/", authentication, authorization("CREATE_POST"), createPost);
postRouter.get("/", authentication, getAllPosts);
postRouter.get("/myPosts", authentication, getMyPosts);


module.exports = postRouter;
