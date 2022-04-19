const asyncHandler = require("express-async-handler");
const Vendor = require("../model/vendor.model");

const create_vendor = asyncHandler(async (req, res) => {
  const { vendor_name, vendor_location } = req.body;
  if (!vendor_name || !vendor_location) {
    throw new Error("Please fill in the requried field");
  }
  try {
    const new_vendor = await Vendor.create(req.body);
    res.status(200).json(new_vendor);
  } catch (error) {
    res.status(400).json(error);
  }
});

const get_vendor_by_id = asyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    res.status(200).json(vendor);
  } catch (error) {
    res.status(200).json(error);
  }
});

const get_all_vendor = asyncHandler(async (req, res) => {
  try {
    const all_vendors = await Vendor.find();
    res.status(200).json(all_vendors);
  } catch (error) {
    res.status(400).json(error);
  }
});

const edit_vendor_by_id = asyncHandler(async (req, res) => {
  try {
    const edit_vendor = await Vendor.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(edit_vendor);
  } catch (error) {
    res.status(400).json(error);
  }
});

//this route delete a vendoer by id
const delete_vendor = asyncHandler(async (req, res) => {
  try {
    const deleting_vendor = await Vendor.findByIdAndDelete(req.params.id);
    res.status(200).json(deleting_vendor);
  } catch (error) {
    res.status(400).json(error);
  }
});

//finding a vendor who have a particuler name and sell a particulear product
const get_vendor_by_product_type = asyncHandler(async (req, res) => {
  const { product_type } = req.body;
  try {
    const finding_by_product = await Vendor.find({
      product_type: product_type,
    });

    // if (finding_by_product) {
    //   console.log("hello food");
    return res.status(200).json(finding_by_product);
    // }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = {
  create_vendor,
  get_all_vendor,
  get_vendor_by_id,
  edit_vendor_by_id,
  delete_vendor,
  get_vendor_by_product_type,
};
