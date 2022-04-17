const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Vehicle = require("../model/vehicleModels");

//this is to create a vehicle
// /api/v1/vehicle/create
const createVehicle = asyncHandler(async (req, res) => {
  const { userId, carBrand, carStatus, proofOfOwnership, plateNumber } =
    req.body;

  if (!userId) {
    throw new Error("You are not a registered user");
  }
  if (!carBrand || !carStatus || !proofOfOwnership || !plateNumber) {
    throw new Error("Please fill all the required field");
  }

  try {
    const vehicle = await Vehicle.create({
      userId,
      carBrand,
      carStatus,
      proofOfOwnership,
      plateNumber,
    });
    if (vehicle) {
      const VehicleOwner = await User.findOne({ _id: userId });
      VehicleOwner.fleet.fleet_size = VehicleOwner.fleet.fleet_size + 1;
      VehicleOwner.fleet.vehicles = [
        ...VehicleOwner.fleet.vehicles,
        vehicle._id,
      ];

      await VehicleOwner.save();
    }
    return res.status(200).json(vehicle);
  } catch (error) {
    return res.status(400).json(error);
  }
});

//this is a admin route to get all the vehicle registered on the app
const getAllVehicle = asyncHandler(async (req, res) => {
  try {
    const gettingAllVehicle = await Vehicle.find().populate(
      "userId",
      "-password"
    );
    return res.status(200).json(gettingAllVehicle);
  } catch (error) {
    return res.status(404).json(error);
  }
});

const getUserVehicle = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  try {
    const userVehicle = await Vehicle.find({
      userId: { $eq: userId },
    })
      .populate("userId", "-password")
      .exec();

    return res.status(200).json(userVehicle);
  } catch (error) {
    res.status(404).json(error);
  }
});

const getOneVehicle = asyncHandler(async (req, res) => {
  try {
    const theVehicle = await Vehicle.findById(req.params.id).populate(
      "userId",
      "-password"
    );
    return res.status(200).json(theVehicle);
  } catch (error) {
    res.status(404).json(error);
  }
});

const editOneVehicle = asyncHandler(async (req, res) => {
  const { carBrand, carStatus, proofOfOwnership, plateNumber } = req.body;
  const newVehicleEdit = {
    carBrand,
    carStatus,
    proofOfOwnership,
    plateNumber,
  };

  try {
    const updatingVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      newVehicleEdit,
      {
        // new: true,
        returnOriginal: false,
      }
    );

    res.status(200).json(updatingVehicle);
  } catch (error) {
    res.status(404).json(error);
  }
});

const deleteOneVehicle = asyncHandler(async (req, res) => {
  try {
    const updatingVehicle = await Vehicle.findByIdAndUpdate(newVehicleEdit, {
      new: true,
    });
    res.status(200).json(updatingVehicle);
    const deletingVehicle = await Vehicle.findByIdAndDelete(req.params.id);
    return res.status(200).json(deletingVehicle);
  } catch (error) {
    res.status(404).json(error);
  }
});

const getVehicleByFilter = asyncHandler(async (req, res) => {
  const { carBrand, carStatus, plateNumber, userId, proofOfOwnership } =
    req.body;
  try {
    const filterCars = await Vehicle.find({
      $or: [
        { carBrand: carBrand },
        { carStatus: carStatus },
        { userId: userId },
        { plateNumber: plateNumber },
        { proofOfOwnership: proofOfOwnership },
      ],
    }).populate("userId", "-password");

    return res.status(200).json(filterCars);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = {
  createVehicle,
  getAllVehicle,
  getVehicleByFilter,
  getUserVehicle,
  getOneVehicle,
  deleteOneVehicle,
  editOneVehicle,
};
