"use strict";

var mongoose = require("mongoose");

var User = require("../router/userRoute");

var RequestForMechanic = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  GPSlocation: {
    type: String,
    required: true
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true
  },
  description: {
    type: String,
    required: true
  },
  otherDetails: {
    type: String
  },
  mechanicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mechanic"
  },
  //the default is null because null + a number give back that number
  service_rating: {
    type: Number,
    "default": 0
  },
  start_task: {
    type: Boolean,
    "default": false
  },
  finish_task: {
    type: Boolean,
    "default": false
  },
  start_time: {
    type: Date
  },
  finish_time: {
    type: Date
  },
  mechanic_rating: {
    type: Number,
    "default": 0
  },
  comment: {
    type: String
  },
  completed: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("RequestForMech", RequestForMechanic);