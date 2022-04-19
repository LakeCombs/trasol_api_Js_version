const asyncHandler = require("express-async-handler");

const paymentApi = asyncHandler(async (req, res) => {
  console.log("this is the payment api");
});

module.exports = paymentApi;
