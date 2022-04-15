const mongoose = require("mongoose");

const RequestForMechanic = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    GPSlocation: { type: String, required: true },
    vehicle: { type: mongoose.Schema.Types, ref: "Vehicle", required: true },
    description: { type: String, required: true },
    otherDetails: { type: String },
    mechanicId: { type: mongoose.Schema.Types.ObjectId, ref: "Mechanic" },
    service_rating: { type: Number },
    mechanic_rating: { type: Number },
    comment: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RequestForMech", RequestForMechanic);
