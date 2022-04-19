const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    vendor_name: { type: String, required: true },
    vendor_location: { type: String, requried: true },
    product_type: { type: String, required: true },
    vendor_rating: { type: Number, default: 0 },
  },

  { timestamp: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);
