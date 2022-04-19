const asyncHandler = require("express-async-handler");
const Product = require("../model/product.model");

const create_product = asyncHandler(async (req, res) => {
  const { vendorId, product_name, product_price, product_description } =
    req.body;
  if (!product_name || !vendorId || !product_price || !product_description) {
    throw new Error("Please fill in the required field");
  }
  try {
    const new_product = await Product.create(req.body);
    if (new_product) {
      res.status(201).json(new_product);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

// this route returns all the product we have in the database
const find_All_product = asyncHandler(async (req, res) => {
  try {
    const all_product = await Product.find();
    res.status(200).json(all_product);
  } catch (error) {
    res.status(400).json(error);
  }
});

//this route return all the product by a certain vendor
const find_vendor_product = asyncHandler(async (req, res) => {
  const { vendorId } = req.body;

  try {
    const vendor_product = await Product.find({ vendorId: vendorId }).populate(
      "vendorId"
    );
    if (vendor_product) {
      res.status(200).json(vendor_product);
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

const find_product_by_id = asyncHandler(async (req, res) => {
  try {
    const get_product = await Product.findById(req.params.id);
    res.status(200).json(get_product);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = {
  create_product,
  find_All_product,
  find_vendor_product,
  find_product_by_id,
};
