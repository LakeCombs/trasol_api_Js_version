const express = require("express");
const { registerMechanic } = require("../controller/mechanicController");

const MechanicRoute = express.Router();

MechanicRoute.post("/register", registerMechanic);

module.exports = MechanicRoute;
