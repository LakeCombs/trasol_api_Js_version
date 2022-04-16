const asyncHandler = require("express-async-handler");
const RequestForMech = require("../model/requestForMechanic");

// i am enforcing these parameter because they are the least requirement
// to request a mechanic and those error are for you to know what is missing
// when you encounter error in the frontend

const requestMechanic = asyncHandler(async (req, res) => {
  const { userId, GPSlocation, vehicleId, description } = req.body;

  if (!GPSlocation) {
    throw new Error("please enter your location or address so we can find you");
  }

  if (!vehicleId || !description) {
    throw new Error(
      "please select a vehicle and give a description of your vehicle issues so we can find you a mechanic"
    );
  }

  if (!userId) {
    throw new Error("Please login to contunue");
  }

  try {
    const requesting = await RequestForMech.create(req.body);

    res.status(200).json(requesting);
  } catch (error) {
    res.status(400).json(error);
  }
});

// this route takes care of the user adding a service_rating, comment,
//mechanic_rating as well as GPS location and description except mechanicId
const editARequests = asyncHandler(async (req, res) => {
  const requestEdit = {
    GPSlocation: req.body.GPSlocation,
    description: req.body.desctiption,
    otherDetails: req.body.otherDetails,
    service_rating: req.body.service_rating,
    mechanic_rating: req.body.mechanic_rating,
    comment: req.body.comment,
    vehicleId: req.body.vehicleId,
    completed: req.body.completed,
  };

  try {
    const editingRequest = await RequestForMech.findByIdAndUpdate(
      req.params.id,
      requestEdit,
      {
        new: true,
      }
    );

    if (editingRequest) res.status(201).send(editingRequest);
  } catch (error) {
    res.status(400).json(error);
  }
});

//the key parameter to get all a single user request is the userId
const getAllSingleMechRequest = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  try {
    const gettingAllMyRequest = await RequestForMech.find({
      userId: { $eq: userId },
    });
    console.log(gettingAllMyRequest);

    res.status(200).json(gettingAllMyRequest);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = { requestMechanic, editARequests };
