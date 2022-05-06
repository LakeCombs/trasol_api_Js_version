"use strict";

var asyncHandler = require("express-async-handler");

var User = require("../model/userModel");

var generateToken = require("../middleware/generateToken");

var decode_token = require("../middleware/decode.token");

var Subscription = require("../model/subscription.model");

var RegisterUser = asyncHandler(function _callee(req, res) {
  var _req$body, email, password, firstName, lastName, phone, userExist, newUser, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password, firstName = _req$body.firstName, lastName = _req$body.lastName, phone = _req$body.phone;

          if (!(!email || !firstName || !lastName || !password || !phone)) {
            _context.next = 3;
            break;
          }

          throw new Error("Please complete the required field");

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 5:
          userExist = _context.sent;

          if (!userExist) {
            _context.next = 8;
            break;
          }

          throw new Error("User already exist");

        case 8:
          _context.prev = 8;
          newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phone: phone
          };
          _context.next = 12;
          return regeneratorRuntime.awrap(User.create(newUser));

        case 12:
          user = _context.sent;
          return _context.abrupt("return", res.status(201).json({
            user: user,
            token: generateToken(user._id)
          }).select("-password"));

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](8);
          return _context.abrupt("return", res.status(400).json(_context.t0.message));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 16]]);
}); // this is the login routes

var LoginUser = asyncHandler(function _callee2(req, res, next) {
  var _req$body2, email, password, user, UserObject;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

          if (!(!email || !password)) {
            _context2.next = 3;
            break;
          }

          throw new Error("fill in the required field");

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 5:
          user = _context2.sent;
          _context2.t0 = user;

          if (!_context2.t0) {
            _context2.next = 11;
            break;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(user.matchPassword(password));

        case 10:
          _context2.t0 = _context2.sent;

        case 11:
          if (!_context2.t0) {
            _context2.next = 14;
            break;
          }

          UserObject = {
            user: user,
            token: generateToken(user._id)
          };
          res.status(201).json(UserObject);

        case 14:
          if (user) {
            _context2.next = 17;
            break;
          }

          res.status(404);
          throw new Error("User not found, register to login");

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //still working on this route because of te complexity of the element inside the object

var EditUser = asyncHandler(function _callee3(req, res) {
  var _req$body3, firstName, lastName, email, subscription, acct_details, ratingNo, no_of_reviews, password, phone, photo, total_repairs, fleet, reports, transaction_hist, newUserEdit, updatingUser;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body3 = req.body, firstName = _req$body3.firstName, lastName = _req$body3.lastName, email = _req$body3.email, subscription = _req$body3.subscription, acct_details = _req$body3.acct_details, ratingNo = _req$body3.ratingNo, no_of_reviews = _req$body3.no_of_reviews, password = _req$body3.password, phone = _req$body3.phone, photo = _req$body3.photo, total_repairs = _req$body3.total_repairs, fleet = _req$body3.fleet, reports = _req$body3.reports, transaction_hist = _req$body3.transaction_hist; //new user object

          newUserEdit = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phone: phone,
            photo: photo,
            finance: {
              subscription: subscription,
              acct_details: acct_details,
              transaction_hist: transaction_hist
            }
          };
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.params.id, // newUserEdit,
          req.body, {
            returnOriginal: false
          }));

        case 5:
          updatingUser = _context3.sent;
          res.status(200).json(editingUser);
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](2);
          res.status(404).json(_context3.t0);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 9]]);
});
var DeleteUser = asyncHandler(function _callee4(req, res) {
  var _id, delUser;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _id = req.body.id;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(User.findOneAndDelete(req.params.id));

        case 4:
          delUser = _context4.sent;

          if (delUser) {
            res.status(200).json(delUser);
          }

          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          res.status(200).json(_context4.t0);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
var getOneUser = asyncHandler(function _callee5(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 3:
          user = _context5.sent;
          return _context5.abrupt("return", res.status(200).json(user));

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.json(400).json(_context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
var getAllUsers = asyncHandler(function _callee6(req, res) {
  var allUser;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(User.find());

        case 3:
          allUser = _context6.sent;
          res.status(200).json(allUser);
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          res.status(400).json(_context6.t0);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = {
  RegisterUser: RegisterUser,
  LoginUser: LoginUser,
  EditUser: EditUser,
  DeleteUser: DeleteUser,
  getAllUsers: getAllUsers,
  getOneUser: getOneUser
};