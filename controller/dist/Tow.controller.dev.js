"use strict";

var asyncHandler = require("express-async-handler");

var Tow = require("../model/tow_service.model");

var User = require("../model/userModel");

var Subscription = require("../model/subscription.model");

var request_for_row = asyncHandler(function _callee(req, res) {
  var _req$body, userId, GPSlocation, get_tow_left, requestingTow;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, userId = _req$body.userId, GPSlocation = _req$body.GPSlocation;

          if (GPSlocation) {
            _context.next = 4;
            break;
          }

          res.status(400);
          throw new Error("Please enter your GPS location so we can find you");

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(Subscription.findOne({
            userId: userId
          }));

        case 6:
          get_tow_left = _context.sent;

          if (!(get_tow_left.tow_service <= 0)) {
            _context.next = 12;
            break;
          }

          res.status(400);
          throw new Error("Sorry you cannot request a tow service, please subscribe and try again");

        case 12:
          _context.prev = 12;
          _context.next = 15;
          return regeneratorRuntime.awrap(Tow.create({
            userId: userId,
            GPSlocation: GPSlocation
          }));

        case 15:
          requestingTow = _context.sent;
          res.status(200).json(requestingTow);
          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](12);
          res.status(400).json(_context.t0);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[12, 19]]);
});
var get_all_tow = asyncHandler(function _callee2(req, res) {
  var all_tow;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Tow.find());

        case 3:
          all_tow = _context2.sent;
          res.status(200).json(all_tow);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(400).json(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
var get_all_tow_by_user = asyncHandler(function _callee3(req, res) {
  var userId, get_all_user_tow;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userId = req.body.userId;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Tow.find({
            userId: userId
          }));

        case 4:
          get_all_user_tow = _context3.sent;
          res.status(200).json(get_all_user_tow);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          res.status(404).json(_context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); //this route update the confirm tow all you need is the id

var confirm_tow = asyncHandler(function _callee4(req, res) {
  var update_confirm, get_subscription_id, subscription_id, user_subsciption, new_tow_count, last;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Tow.findByIdAndUpdate(req.params.id, {
            confirm: true
          }, {
            "new": true
          }));

        case 3:
          update_confirm = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            _id: update_confirm.userId
          }));

        case 6:
          get_subscription_id = _context4.sent;
          subscription_id = get_subscription_id.finance.subscription_plan;
          _context4.next = 10;
          return regeneratorRuntime.awrap(Subscription.findOne({
            _id: subscription_id
          }));

        case 10:
          user_subsciption = _context4.sent;
          new_tow_count = user_subsciption.tow_service - 1;
          _context4.next = 14;
          return regeneratorRuntime.awrap(Subscription.findByIdAndUpdate(subscription_id, {
            tow_service: new_tow_count
          }, {
            "new": true
          }));

        case 14:
          last = _context4.sent;
          console.log("check this ", last);
          res.status(202).json(update_confirm);
          _context4.next = 22;
          break;

        case 19:
          _context4.prev = 19;
          _context4.t0 = _context4["catch"](0);
          res.status(400).json(_context4.t0);

        case 22:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 19]]);
});
module.exports = {
  request_for_row: request_for_row,
  get_all_tow: get_all_tow,
  get_all_tow_by_user: get_all_tow_by_user,
  confirm_tow: confirm_tow
};