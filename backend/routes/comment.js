const express = require("express");
const commentRouter = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const createComment=require("../controllers/comment")

commentRouter.post("/",authentication ,createComment);
module.exports = commentRouter;