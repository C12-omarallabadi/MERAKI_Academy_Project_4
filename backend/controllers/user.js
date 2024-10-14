const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

const userModel = require("../models/userSchema");
const register = (req, res) => {
  const { firstName, lastName, age, email, password, role } = req.body;
  const newUser = new userModel({
    firstName,
    lastName,
    fullName:(firstName+" "+lastName).toLocaleLowerCase(),
    age,
    email,
    password,
    role:"67027c8f73e54b8b5f091793",
  });
  newUser
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Account Created Successfully",
        author: result,
      });
    })
    .catch((err) => {
      console.log(err.message);

      res.status(409).json({
        success: false,
        message: "The email already exists",
      });
    });
};
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email }).populate("role");
    if (user) {
      const isEqual = await bcrypt.compare(password, user.password);
      if (isEqual) {
        const payload = {
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        };
        const options = { expiresIn: "60m" };
        const token = Jwt.sign(payload, process.env.SECRET, options);

        res.status(200).json({
          success: true,
          massage: "Valid login credentials",
          token: token,
          role: user.role,
          userId:user._id

        });
      } else {
        res.status(403).json({
          success: false,
          massage: "password is wrong ",
        });
      }
    } else {
      throw err;
    }
  } catch (err) {
    res.status(403).json({
      success: false,
      massage: "The email doesn’t exist ",
    });
  }
};
const getUserById = (req, res) => {
  userModel
    .findOne({ _id: req.params.id })
    .then((result) => {
      if (!result) {
        res.status(404).json("no user have thid id");
      } else {
        res.status(200).json(result);
      }
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};
const deleteUserById = (req, res) => {
  userModel
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).json("no user have this id");
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err.message);
    });
};
const getAllUsers=(req,res)=>{
  userModel
  .find({})
  .then((result) => {
    res.status(200).json(result);
  })
  .catch((err) => {
    res.status(500).json(err.message);
  });

}




module.exports = { register, login, getUserById, deleteUserById ,getAllUsers};
