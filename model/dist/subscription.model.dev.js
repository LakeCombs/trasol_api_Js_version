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
          if (!this.isModified) {
            next();
          }

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
            this.choose_a_specialist = true;
          }

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});
module.exports = mongoose.model("Subscription", subscriptionModel);