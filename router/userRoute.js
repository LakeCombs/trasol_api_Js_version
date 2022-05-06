const express = require("express");
const {
	RegisterUser,
	LoginUser,
	EditUser,
	DeleteUser,
	getAllUsers,
	getOneUser
} = require("../controller/userController");
const protect = require("../middleware/authenticationMiddeware");
const decode_token = require("../middleware/decode.token");
const UserRoute = express.Router();

//note the order of this arrnagement is very important
//things might break if they are changed
// all the route with protect mean the user most be logged in before they can access them
UserRoute.get("/", getAllUsers);
UserRoute.post("/register", RegisterUser);
UserRoute.post("/login", LoginUser);
UserRoute.get("/:id", getOneUser);
UserRoute.delete("/:id", DeleteUser);
UserRoute.put("/:id", protect, EditUser);

module.exports = UserRoute;
