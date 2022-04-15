const express = require("express");
const {
  createVehicle,
  getAllVehicle,
  getUserVehicle,
  getOneVehicle,
  deleteOneVehicle,
  editOneVehicle,
  getVehicleByFilter,
} = require("../controller/vehicleController");
const protect = require("../middleware/authenticationMiddeware");

const VehicleRoute = express.Router();

VehicleRoute.post("/create", protect, createVehicle);
VehicleRoute.get("/", protect, getAllVehicle);
VehicleRoute.get("/user", protect, getUserVehicle);
VehicleRoute.get("/filter", protect, getVehicleByFilter);
VehicleRoute.get("/:id", protect, getOneVehicle);
VehicleRoute.delete("/:id", protect, deleteOneVehicle);
VehicleRoute.put("/:id", protect, editOneVehicle);

module.exports = VehicleRoute;
