"use strict";

var mongoose = require("mongoose");

var bcrypt = require("bcryptjs");

var Vehicle = require("./vehicleModels");

var Report = require("./reportModel");

var Subscription = require("./subscription.model");

var userModel = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  photo: {
    type: String,
    "default": "https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png"
  },
  finance: {
    subscription_plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Subscription
    },
    acct_details: {
      type: String
    },
    transaction_hist: []
  },
  activity: {
    rating: {
      ratingNo: {
        type: Number,
        "default": 0
      },
      no_of_reviews: {
        type: Number,
        "default": 0
      }
    }
  },
  reports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Report
  }],
  fleet: {
    fleet_size: {
      type: Number,
      "default": 0
    },
    total_repairs: {
      type: Number,
      "default": 0
    },
    vehicles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: Vehicle
    }]
  }
}, {
  timestamps: true
});

userModel.methods.matchPassword = function _callee(password) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(bcrypt.compare(password, this.password));

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
};

userModel.pre("save", function _callee2(next) {
  var salt;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!this.isModified) {
            next();
          }

          _context2.next = 3;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 3:
          salt = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(bcrypt.hash(this.password, salt));

        case 6:
          this.password = _context2.sent;

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
});
module.exports = mongoose.model("User", userModel);