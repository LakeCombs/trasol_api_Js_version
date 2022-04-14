const mongoose = require("mongoose");
const vehicle = require("./vehicleModels");

const RequestForMechanic = new mongoose(
  {
    GPSlocation: {
      type: String,
      required: true,
    },

    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: vehicle,
    },
    description: {
      type: String,
      required: true,
    },
    otherDetails: {
      type: String,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("RequesForMech", RequestForMechanic);
