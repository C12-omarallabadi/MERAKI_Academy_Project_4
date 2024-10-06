const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("../backend/models/db");
const userRouter = require("../backend/routes/user");
const roleRouter = require("../backend/routes/role");
const postRouter = require("../backend/routes/post");
const commentRouter = require("../backend/routes/comment");


const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/roles", roleRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);


// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
