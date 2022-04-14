const mongoose = require("mongoose");

const vehicleModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carBrand: { type: String, required: true },
    carStatus: { type: String, required: true },
    proofOfOwnership: { type: String, required: true },
    plateNumber: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleModel);
