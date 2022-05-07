const express = require("express");
const {
	request_for_row,
	get_all_tow,
	get_all_tow_by_user,
	confirm_tow
} = require("../controller/Tow.controller");

const tow_route = express.Router();

tow_route.post("/", request_for_row);
tow_route.get("/", get_all_tow);
tow_route.get("/user", get_all_tow_by_user);
tow_route.put("/confirm/:id", confirm_tow);

module.exports = tow_route;
