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
  var _req$body2, userId, subscription_plan, getUser, user_subscription, user_current_subscription, updated_subscription_plan;

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
          _context2.next = 7;
          return regeneratorRuntime.awrap(Subscription.findOne({
            _id: getUser.finance.subscription_plan._id
          }));

        case 7:
          user_subscription = _context2.sent;
          user_current_subscription = user_subscription.subscription_plan;
          console.log("current plan", user_current_subscription); //the rollover for the same subscription_plan isn't workin yet but
          // the function works for normal subscription plan

          if (!(subscription_plan === "starter")) {
            _context2.next = 14;
            break;
          }

          if (user_current_subscription === "starter") {
            user_subscription.repairs = user_subscription.repairs + 4;
            console.log("check this update", user_subscription.repairs);
            user_subscription.tow_serice = user_subscription.tow_serice + 2;
          } else {
            user_subscription.subscription_plan = "starter";
            user_subscription.repairs = 4;
            user_subscription.tow_service = 2;
            user_subscription.unlimited_support = false;
            user_subscription.choose_a_specialist = false;
            user_subscription.help_a_friend = false;
            user_subscription.alternative_free_ride = false;
          }

          _context2.next = 24;
          break;

        case 14:
          if (!(subscription_plan === "classic")) {
            _context2.next = 18;
            break;
          }

          if (user_current_subscription == "classic") {
            user_subscription.repairs = +8;
            user_subscription.tow_serice = +4;
          } else {
            user_subscription.subscription_plan = "classic";
            user_subscription.repairs = 8;
            user_subscription.tow_service = 4;
            user_subscription.unlimited_support = false;
            user_subscription.choose_a_specialist = false;
            user_subscription.help_a_friend = false;
            user_subscription.alternative_free_ride = false;
          }

          _context2.next = 24;
          break;

        case 18:
          if (!(subscription_plan === "luxuriate")) {
            _context2.next = 22;
            break;
          }

          if (user_current_subscription === "luxuriate") {
            user_subscription.repairs = +1000;
            user_subscription.tow_serice = +1000;
          } else {
            user_subscription.subcription_plan = "luxuriate";
            user_subscription.repairs = 1000;
            user_subscription.tow_service = 1000;
            user_subscription.unlimited_support = true;
            user_subscription.choose_a_specialist = true;
            user_subscription.help_a_friend = true;
            user_subscription.alternative_free_ride = true;
          }

          _context2.next = 24;
          break;

        case 22:
          res.status(400);
          throw new Error("please choose a subscription plan");

        case 24:
          _context2.next = 26;
          return regeneratorRuntime.awrap(user_subscription.save());

        case 26:
          updated_subscription_plan = _context2.sent;
          res.status(201).json(updated_subscription_plan);
          _context2.next = 33;
          break;

        case 30:
          _context2.prev = 30;
          _context2.t0 = _context2["catch"](1);
          res.status(400).json(_context2.t0);

        case 33:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 30]]);
});
var get_all_subscriptions_plan = asyncHandler(function _callee3(req, res) {
  var all_subscriptions;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Subscription.find().populate("userId", "email firstName lastName phone fleet"));

        case 3:
          all_subscriptions = _context3.sent;
          res.status(200).json(all_subscriptions);
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(401).json(_context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //you can get user subscription with either there userId or their email

var get_subscription_by_user = asyncHandler(function _callee4(req, res) {
  var email, user, subscription_id, user_subscription;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          email = req.body.email;
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 3:
          user = _context4.sent;
          _context4.prev = 4;

          if (user) {
            _context4.next = 8;
            break;
          }

          res.status(404);
          throw new Error("the email does not belong to any user");

        case 8:
          subscription_id = user.finance.subscription_plan._id;
          _context4.next = 11;
          return regeneratorRuntime.awrap(Subscription.findById({
            _id: subscription_id
          }).populate("userId", "email firstName lastName phone fleet"));

        case 11:
          user_subscription = _context4.sent;

          if (user_subscription) {
            _context4.next = 15;
            break;
          }

          res.status(404);
          throw new Error("Sorry this user does not have a subscription plan");

        case 15:
          res.status(200).json(user_subscription);
          _context4.next = 21;
          break;

        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](4);
          res.status(400).json(_context4.t0);

        case 21:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[4, 18]]);
});
var get_subscription_by_plan = asyncHandler(function _callee5(req, res) {
  var subscription_plan, by_subscription_plan;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          subscription_plan = req.body.subscription_plan;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Subscription.find({
            subscription_plan: subscription_plan
          }).populate("userId", "email firstName lastName phone fleet"));

        case 4:
          by_subscription_plan = _context5.sent;
          res.status(200).json(by_subscription_plan);
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          res.status(400).json(_context5.t0);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
module.exports = {
  user_add_subscription: user_add_subscription,
  renew_subscription: renew_subscription,
  get_all_subscriptions_plan: get_all_subscriptions_plan,
  get_subscription_by_user: get_subscription_by_user,
  get_subscription_by_plan: get_subscription_by_plan
};