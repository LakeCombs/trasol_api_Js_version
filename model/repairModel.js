const mongoose = require("mongoose");
const Vehicle = require("./vehicleModels");

const RepairModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.objectId,
      ref: User,
      required: true,
    },

    mechanicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    location: {
      type: String,
      requried: true,
    },
    dateOfRepair: {
      type: Date,
      required: true,
    },
    vehicleRepaired: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Vehicle,
    },
    fault: {
      type: String,
      required: true,
    },

    completed: { type: boolean, required: true, default: false },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Repair", RepairModel);
