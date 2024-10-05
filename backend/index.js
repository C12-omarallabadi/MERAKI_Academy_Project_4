const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db=require("../backend/models/db")
const userRouter=require("../backend/routes/user")
const app = express();
const PORT = process.env.PORT ;

app.use(cors());
app.use(express.json());
app.use("/users",userRouter);


// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
