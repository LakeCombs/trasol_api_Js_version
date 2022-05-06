"use strict";

var mongoose = require("mongoose");

var subscriptionModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  subscription_plan: {
    type: String,
    required: true
  },
  check_diagnosis: {
    type: Boolean,
    "default": true
  },
  repairs: {
    type: Number
  },
  tow_service: {
    type: Number
  },
  alternative_free_ride: {
    type: Boolean
  },
  unlimited_support: {
    type: Boolean,
    "default": false
  },
  choose_a_specialist: {
    type: Boolean,
    "default": false
  },
  parts_sales_and_delivery: {
    type: Boolean,
    "default": true
  },
  help_a_friend: {
    type: Boolean,
    "default": false
  },
  renewal_time: {
    type: Date
  }
}, {
  timestamps: true
});
subscriptionModel.pre("save", function _callee(subscription_type, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // if(!this.isModified){
          // 	next();
          // }
          if (this.subscription_plan == "starter") {
            this.repairs = 4;
            this.tow_service = 2;
          } else if (this.subscription_plan == "classic") {
            this.repairs = 8;
            this.tow_service = 4;
          } else if (this.subscription_plan == "luxuriates") {
            this.repairs = 1000;
            this.tow_service = 1000;
            this.alternative_free_ride = true;
            this.alternative_free_ride = true;
            this.unlimited_support = true;
            this.help_a_friend = true;
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});

subscriptionModel.methods.roll_over_subscription = function _callee2(subscription_plan) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(subscription_plan === "starter")) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", (this.repairs = +4, this.tow_service = +2, this.alternative_free_ride = false, this.unlimited_support = false, this.help_a_friend = false));

        case 4:
          if (!(subscription_plan === "classic")) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", (this.repairs = +8, this.tow_service = +4, this.alternative_free_ride = false, this.unlimited_support = false, this.help_a_friend = false));

        case 8:
          if (!(subscription_plan === "luxuriate")) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", (this.repairs = +1000, this.tow_service = +1000, this.alternative_free_ride = true, this.unlimited_support = true, this.help_a_friend = true));

        case 12:
          return _context2.abrupt("return");

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
};

module.exports = mongoose.model("Subscription", subscriptionModel);