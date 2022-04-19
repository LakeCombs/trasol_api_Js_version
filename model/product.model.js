const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_name: { type: String, requried: true },
    product_price: { type: Number, required: true },
    product_condition: { type: String, requried: true },
    product_description: { type: String, requried: true },
    location: { type: String },
    category: { type: String, requried: true },
    product_rating: { type: Number, default: 0 },
    demand_rating: { type: Number, default: 0 },
    vendorId: { type: mongoose.Types.ObjectId, ref: "Vendor" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
