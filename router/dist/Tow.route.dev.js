"use strict";

var express = require("express");

var _require = require("../controller/Tow.controller"),
    request_for_row = _require.request_for_row,
    get_all_tow = _require.get_all_tow,
    get_all_tow_by_user = _require.get_all_tow_by_user,
    confirm_tow = _require.confirm_tow;

var tow_route = express.Router();
tow_route.post("/", request_for_row);
tow_route.get("/", get_all_tow);
tow_route.get("/user", get_all_tow_by_user);
tow_route.put("/confirm/:id", confirm_tow);
module.exports = tow_route;