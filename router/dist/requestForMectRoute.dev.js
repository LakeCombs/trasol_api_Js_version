"use strict";

var express = require("express");

var protect = require("../middleware/authenticationMiddeware");

var _require = require("../controller/requestForMechController"),
    requestMechanic = _require.requestMechanic,
    editARequests = _require.editARequests,
    getAllMechanicRequest = _require.getAllMechanicRequest,
    mechanicAcceptMechRequest = _require.mechanicAcceptMechRequest,
    getSingleUserMechRequest = _require.getSingleUserMechRequest,
    getMehanicCompletedRepair = _require.getMehanicCompletedRepair,
    getSingleMechRequest = _require.getSingleMechRequest,
    mechanicRating = _require.mechanicRating,
    mech_start_repairs = _require.mech_start_repairs,
    mech_finish_repair = _require.mech_finish_repair;

var RequestForMechRoute = express.Router();
RequestForMechRoute.get("/", getAllMechanicRequest);
RequestForMechRoute.get("/:id", getSingleMechRequest);
RequestForMechRoute.post("/", // protect,
requestMechanic);
RequestForMechRoute.get("/completed", getMehanicCompletedRepair);
RequestForMechRoute.put("/user/:id", protect, editARequests);
RequestForMechRoute.get("/user", protect, getSingleUserMechRequest);
RequestForMechRoute.put("/accept/:id", protect, mechanicAcceptMechRequest);
RequestForMechRoute.put("/rate/:id", mechanicRating);
RequestForMechRoute.put("/start/:id", mech_start_repairs);
RequestForMechRoute.put("/finish/:id", mech_finish_repair);
module.exports = RequestForMechRoute;