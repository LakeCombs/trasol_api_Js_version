const express = require("express");
const {
  create_product,
  find_All_product,
  find_product_by_id,
  find_vendor_product,
} = require("../controller/product.controller");

const product_route = express.Router();

product_route.post("/", create_product);
product_route.get("/", find_All_product);
product_route.get("/:id", find_product_by_id);
product_route.get("/vendor", find_vendor_product);

module.exports = product_route;
