const mongoose = require("mongoose");
const User = require("../router/userRoute");

const RequestForMechanic = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    GPSlocation: { type: String, required: true },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    description: { type: String, required: true },
    otherDetails: { type: String },
    mechanicId: { type: mongoose.Schema.Types.ObjectId, ref: "Mechanic" },
    service_rating: { type: Number },
    mechanic_rating: { type: Number },
    comment: { type: String },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RequestForMech", RequestForMechanic);
