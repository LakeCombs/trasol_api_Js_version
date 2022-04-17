const asyncHandler = require("express-async-handler");
const RequestForMech = require("../model/requestForMechanic");
const Mechanic = require("../model/mehanicModel");

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
//to use this route you must enforce it to be sent only when completed is false
//so that the mechanic completed array will be populated anyhow
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

    const mechanicId = editingRequest.mechanicId;

    // this condition only work when the user put in completed from the frontend
    if (editingRequest.completed === true) {
      const Repairer = await Mechanic.findOne({
        _id: mechanicId,
      });
      Repairer.completedRepairs = [
        ...Repairer.completedRepairs,
        editingRequest._id,
      ];
      console.log(Repairer);
      await Repairer.save();
    }

    res.status(201).send(editingRequest);
  } catch (error) {
    res.status(400).json(error);
  }
});

//the key parameter to get all a single user request is the userId
const getSingleUserMechRequest = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  try {
    const gettingAllMyRequest = await RequestForMech.find({
      userId: { $eq: userId },
    })
      .populate("userId", "-password")
      .populate("vehicleId")
      .exec();

    res.status(200).json(gettingAllMyRequest);
  } catch (error) {
    res.status(400).json(error);
  }
});

const getAllMechanicRequest = asyncHandler(async (req, res) => {
  try {
    const allMechanicRequest = await RequestForMech.find()
      .populate("userId", "-password")
      .populate("vehicleId");

    return res.status(200).json(allMechanicRequest);
  } catch (error) {
    res.status(400).json(error);
  }
});

const mechanicAcceptMechRequest = asyncHandler(async (req, res) => {
  const { mechanicId } = req.body;

  try {
    const accepting = await RequestForMech.findByIdAndUpdate(
      req.params.id,
      { mechanicId },
      { new: true }
    )
      .populate("userId", "-password")
      .populate("mechanicId", "-password");

    if (accepting) {
      res.status(200).json(accepting);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

//this route will get all the repair a particular mechanic have completed
//so they know how much they are doing on the platform
//the only parameter you need is the mechanicId
const getMehanicCompletedRepair = asyncHandler(async (req, res) => {
  const { mechanicId } = req.body;
  try {
    const mechanicRapairCount = await RequestForMech.find({
      $and: [{ mechanicId: { $eq: mechanicId } }, { completed: true }],
    })
      .populate("userId", "-password")
      .exec();

    return res.status(200).json(mechanicRapairCount);
  } catch (error) {
    res.status(400).json(error);
  }
});

const getSingleMechRequest = asyncHandler(async (req, res) => {
  try {
    const getSiglerequest = await RequestForMech.findById(req.params.id)
      .populate("userId", "-password")
      .populate("mechanicId", "-password");
    res.status(200).json(getSiglerequest);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = {
  requestMechanic,
  editARequests,
  getSingleUserMechRequest,
  getAllMechanicRequest,
  mechanicAcceptMechRequest,
  getMehanicCompletedRepair,
  getSingleMechRequest,
};

//tomorrow i will work on the mechanic rating such that it is authomated
