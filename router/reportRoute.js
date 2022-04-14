const express = require("express");
const {
  getAllReport,
  getAUserReport,
  deleteAReport,
  getSingleReport,
  editSingleReport,
  createReport,
} = require("../controller/reportController");
const protect = require("../middleware/authenticationMiddeware");

const ReportRoute = express.Router();

ReportRoute.get("/", protect, getAllReport);
ReportRoute.post("/", protect, createReport);
ReportRoute.get("/user", protect, getAUserReport);
ReportRoute.get("/:id", protect, getSingleReport);

ReportRoute.delete("/:id", protect, deleteAReport);
ReportRoute.put("/:id", protect, editSingleReport);

module.exports = ReportRoute;
