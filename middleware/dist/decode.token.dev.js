"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var jwt = require("jsonwebtoken");

var asyncHandler = require("express-async-handler");

var decode_token = function decode_token(req, res, next) {
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    var bearerHeader = req.headers.authorization;

    if (_typeof(bearerHeader) !== undefined) {
      var bearer_token = bearerHeader.split(" ")[1];
      var user = jwt.verify(bearer_token, process.env.TOKEN_SECRET);
      console.log("user", user);
      return user;
    } else {
      res.status(404);
      throw new Error("User not available");
    }
  }
}; // export default user_value = decode_token();


module.exports = decode_token;