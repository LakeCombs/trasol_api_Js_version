"use strict";

var asyncHandler = require("express-async-handler");

var User = require("../model/userModel");

var generateToken = require("../middleware/generateToken");

var decode_token = require("../middleware/decode.token");

var jwt = require("jsonwebtoken");

var Subscription = require("../model/subscription.model"); //to use this route you need the userId and the subscription plan
//the 3 plan are "starter", "classic", "luxuriate"
//note the plan have to be spelt like this


var user_add_subscription = asyncHandler(function _callee(req, res) {
  var _req$body, userId, subscription_plan, user_subscription;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, userId = _req$body.userId, subscription_plan = _req$body.subscription_plan;

          if (subscription_plan) {
            _context.next = 3;
            break;
          }

          throw new Error("Please choose a subscription_plan");

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(Subscription.create(req.body));

        case 6:
          user_subscription = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate({
            _id: userId
          }, {
            $set: {
              "finance.subscription_plan": user_subscription._id
            }
          }));

        case 9:
          res.status(200).json(user_subscription);
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](3);
          res.status(401).json(_context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 12]]);
}); //still working on this route

var renew_subscription = asyncHandler(function _callee2(req, res) {
  var _req$body2, userId, subscription_plan, getUser, user_subscription_plan_id, the_subscription, renewing;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, userId = _req$body2.userId, subscription_plan = _req$body2.subscription_plan;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            _id: userId
          }));

        case 4:
          getUser = _context2.sent;
          user_subscription_plan_id = getUser.finance.subscription_plan;
          _context2.next = 8;
          return regeneratorRuntime.awrap(Subscription.findOne({
            _id: user_subscription_plan_id
          }));

        case 8:
          the_subscription = _context2.sent;
          _context2.next = 11;
          return regeneratorRuntime.awrap(the_subscription.roll_over_subscription(subscription_plan));

        case 11:
          renewing = _context2.sent;
          res.status(201).json(renewing);
          console.log("new", renewing);
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](1);
          res.status(400).json(_context2.t0);

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 16]]);
});
module.exports = {
  user_add_subscription: user_add_subscription,
  renew_subscription: renew_subscription
};