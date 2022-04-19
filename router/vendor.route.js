const express = require("express");
const {
  create_vendor,
  get_all_vendor,
  get_vendor_by_id,
  edit_vendor_by_id,
  delete_vendor,
} = require("../controller/vendor.controller");

const vendorRoute = express.Router();

vendorRoute.post("/", create_vendor);
vendorRoute.get("/", get_all_vendor);
vendorRoute.post("/:id", get_vendor_by_id);
vendorRoute.put("/:id", edit_vendor_by_id);
vendorRoute.get("/product", get_vendor_by_id);
vendorRoute.delete("/:id", delete_vendor);

module.exports = vendorRoute;
