const express = require("express");
const {
  RegisterUser,
  LoginUser,
  EditUser,
  DeleteUser,
  getAllUsers,
} = require("../controller/userController");

const UserRoute = express.Router();

UserRoute.get("/", getAllUsers);
UserRoute.post("/register", RegisterUser);
UserRoute.post("/login", LoginUser);
UserRoute.put("/:id", EditUser);
UserRoute.delete("/:id", DeleteUser);

module.exports = UserRoute;
