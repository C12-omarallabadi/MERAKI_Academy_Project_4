const express = require("express");
const commentRouter = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const {createComment,deleteComment,getCommentsById }= require("../controllers/comment");


commentRouter.post("/:id", authentication, createComment);
commentRouter.delete("/:id", authentication, deleteComment);
commentRouter.get("/:id", authentication, getCommentsById);



module.exports = commentRouter;
