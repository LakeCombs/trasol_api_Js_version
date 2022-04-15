const express = require("express");
const {
  registerMechanic,
  loginMechanic,
  getAllMechanic,
  getOneMechanicById,
  editOneMechanicData,
  getMehanicByFilter,
} = require("../controller/mechanicController");
const protect = require("../middleware/authenticationMiddeware");

const MechanicRoute = express.Router();

MechanicRoute.post("/register", registerMechanic);
MechanicRoute.post("/login", loginMechanic);
MechanicRoute.get("/", getAllMechanic);
MechanicRoute.get("/filter", getMehanicByFilter);
MechanicRoute.get("/:id", getOneMechanicById);
MechanicRoute.put("/:id", protect, editOneMechanicData);

module.exports = MechanicRoute;
