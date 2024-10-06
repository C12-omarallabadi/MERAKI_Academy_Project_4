const roleModel = require("../models/roleSchema");
const createRole = (req, res) => {
  const { role, permissions } = req.body;
  const newRole = new roleModel({
    role,
    permissions,
  });
  newRole
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Role Created Successfully",
        role: result,
      });
    })
    .catch((err) => {
      console.log(err.message);

      res.status(409).json({
        success: false,
        message: "The role already exists",
      });
    });
};
module.exports = createRole;
