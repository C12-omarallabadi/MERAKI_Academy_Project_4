const express = require("express");
const usersRouter = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const {register,login,getUserById,deleteUserById,getAllUsers} = require("../controllers/user");
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/:id",authentication, getUserById);
usersRouter.delete("/:id",authentication, deleteUserById);
usersRouter.get("/",authentication, getAllUsers);



module.exports = usersRouter;
