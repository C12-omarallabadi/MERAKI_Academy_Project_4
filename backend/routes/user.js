const express = require("express");
const usersRouter = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const {register,login,getUserById,deleteUserById} = require("../controllers/user");
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/:id", getUserById);
usersRouter.delete("/:id", deleteUserById);


module.exports = usersRouter;
