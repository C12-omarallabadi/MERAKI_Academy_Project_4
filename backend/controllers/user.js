const userModel = require("../models/userSchema");
const register = (req, res) => {
  const { firstName, lastName, age, email, password, role } = req.body;
  const newUser = new userModel({
    firstName,
    lastName,
    age,
    email,
    password,
    role,
  });
  newUser
    .save()
    .then((result) => {
      res
        .status(201)
        .json({
          success: true,
          message: "Account Created Successfully",
          author: result,
        });
    })
    .catch((err) => {
        console.log(err.message)

      res.status(409).json({
        success: false,
        message: "The email already exists",
      });
    });
};
module.exports = register;
