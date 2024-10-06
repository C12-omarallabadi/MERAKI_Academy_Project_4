const express = require("express");
const commentRouter = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const {createComment,deleteComment }= require("../controllers/comment");


commentRouter.post("/", authentication, createComment);
commentRouter.delete("/:id", authentication, deleteComment);

module.exports = commentRouter;
