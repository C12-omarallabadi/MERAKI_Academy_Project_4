const express = require("express");
const roleRouter = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const createRole=require("../controllers/role")

roleRouter.post("/", createRole);
module.exports = roleRouter;