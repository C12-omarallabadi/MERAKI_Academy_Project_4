const express = require("express");
const usersRouter = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const {register,login} = require("../controllers/user");
usersRouter.post("/register", register);
usersRouter.post("/login", login);
module.exports = usersRouter;
