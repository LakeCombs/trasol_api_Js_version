"use strict";

var express = require("express");

var _require = require("../controller/userController"),
    RegisterUser = _require.RegisterUser,
    LoginUser = _require.LoginUser,
    EditUser = _require.EditUser,
    DeleteUser = _require.DeleteUser,
    getAllUsers = _require.getAllUsers,
    getOneUser = _require.getOneUser;

var protect = require("../middleware/authenticationMiddeware");

var decode_token = require("../middleware/decode.token");

var UserRoute = express.Router(); //note the order of this arrnagement is very important
//things might break if they are changed
// all the route with protect mean the user most be logged in before they can access them

UserRoute.get("/", getAllUsers);
UserRoute.post("/register", RegisterUser);
UserRoute.post("/login", LoginUser);
UserRoute.get("/:id", getOneUser);
UserRoute["delete"]("/:id", DeleteUser);
UserRoute.put("/:id", protect, EditUser);
module.exports = UserRoute;