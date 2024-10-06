const authorization = (permission) => {
  return (req, res, next) => {
    const token = req.payload;
    const userPermissions = token.role.permissions;
    if (userPermissions.includes(permission)) {
      next();
    } else {
      console.log(permission);
      console.log(userPermissions);
      res.status(403).json({ success: false, massage: "Unauthorized" });
    }
  };
};

module.exports = authorization;
