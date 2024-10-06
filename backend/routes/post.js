const express = require("express");
const postRouter = express.Router();
const createPost=require("../controllers/post")

postRouter.post("/", createPost);
module.exports = postRouter;