const asyncHandler = require("express-async-handler");

const getAllRequestForMech = asyncHandler(async (req, res) => {
  try {
    const allRequestForMech = await RequestForMech.find();
    res.status(200).json(allRequestForMech);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = { getAllRequestForMech };
