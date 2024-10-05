const express = require("express");
const usersRouter = express.Router();
const register=require("../controllers/user")

usersRouter.post("/register", register);
module.exports = usersRouter;