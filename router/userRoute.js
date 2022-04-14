const express = require("express");
const {
  RegisterUser,
  LoginUser,
  EditUser,
  DeleteUser,
  getAllUsers,
  getOneUser,
} = require("../controller/userController");
const protect = require("../middleware/authenticationMiddeware");

const UserRoute = express.Router();

UserRoute.get("/", getAllUsers);
UserRoute.post("/register", RegisterUser);
UserRoute.post("/login", LoginUser);
UserRoute.get("/:id", getOneUser);
UserRoute.delete("/:id", DeleteUser);
UserRoute.put("/:id", protect, EditUser);

module.exports = UserRoute;
