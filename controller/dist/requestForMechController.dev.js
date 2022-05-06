"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var asyncHandler = require("express-async-handler");

var RequestForMech = require("../model/requestForMechanic");

var Mechanic = require("../model/mehanicModel"); // i am enforcing these parameter because they are the least requirement
// to request a mechanic and those error are for you to know what is missing
// when you encounter error in the frontend


var requestMechanic = asyncHandler(function _callee(req, res) {
  var _req$body, userId, GPSlocation, vehicleId, description, requesting;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, userId = _req$body.userId, GPSlocation = _req$body.GPSlocation, vehicleId = _req$body.vehicleId, description = _req$body.description;

          if (GPSlocation) {
            _context.next = 3;
            break;
          }

          throw new Error("please enter your location or address so we can find you");

        case 3:
          if (!(!vehicleId || !description)) {
            _context.next = 5;
            break;
          }

          throw new Error("please select a vehicle and give a description of your vehicle issues so we can find you a mechanic");

        case 5:
          if (userId) {
            _context.next = 7;
            break;
          }

          throw new Error("Please login to contunue");

        case 7:
          _context.prev = 7;
          _context.next = 10;
          return regeneratorRuntime.awrap(RequestForMech.create(req.body));

        case 10:
          requesting = _context.sent;
          res.status(200).json(requesting);
          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](7);
          res.status(400).json(_context.t0);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[7, 14]]);
}); // this route takes care of the user adding a comment,
//as well as GPS location and description except mechanicId
//to use this route you must enforce it to be sent only when completed is false
//so that the mechanic completed array will be populated anyhow

var editARequests = asyncHandler(function _callee2(req, res) {
  var requestEdit, editingRequest, mechanicId, Repairer;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          requestEdit = {
            GPSlocation: req.body.GPSlocation,
            description: req.body.desctiption,
            otherDetails: req.body.otherDetails,
            service_rating: req.body.service_rating,
            mechanic_rating: req.body.mechanic_rating,
            comment: req.body.comment,
            vehicleId: req.body.vehicleId,
            completed: req.body.completed
          }; //note this function is not taking care of mechanic rating because the rating will be an average
          // and i need some more logic to put in place

          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(RequestForMech.findByIdAndUpdate(req.params.id, requestEdit, {
            "new": true
          }));

        case 4:
          editingRequest = _context2.sent;
          mechanicId = editingRequest.mechanicId; // this condition only work when the user put in completed from the frontend

          if (!(editingRequest.completed === true)) {
            _context2.next = 14;
            break;
          }

          _context2.next = 9;
          return regeneratorRuntime.awrap(Mechanic.findOne({
            _id: mechanicId
          }));

        case 9:
          Repairer = _context2.sent;
          Repairer.completedRepairs = [].concat(_toConsumableArray(Repairer.completedRepairs), [editingRequest._id]);
          console.log(Repairer);
          _context2.next = 14;
          return regeneratorRuntime.awrap(Repairer.save());

        case 14:
          res.status(201).send(editingRequest);
          _context2.next = 20;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](1);
          res.status(400).json(_context2.t0);

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 17]]);
}); //the key parameter to get all a single user request is the userId

var getSingleUserMechRequest = asyncHandler(function _callee3(req, res) {
  var userId, gettingAllMyRequest;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userId = req.body.userId;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(RequestForMech.find({
            userId: {
              $eq: userId
            }
          }).populate("userId", "-password").populate("vehicleId").exec());

        case 4:
          gettingAllMyRequest = _context3.sent;
          res.status(200).json(gettingAllMyRequest);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          res.status(400).json(_context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
var getAllMechanicRequest = asyncHandler(function _callee4(req, res) {
  var allMechanicRequest;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(RequestForMech.find().populate("userId", "-password").populate("vehicleId"));

        case 3:
          allMechanicRequest = _context4.sent;
          return _context4.abrupt("return", res.status(200).json(allMechanicRequest));

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(400).json(_context4.t0);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
var mechanicAcceptMechRequest = asyncHandler(function _callee5(req, res) {
  var mechanicId, accepting;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          mechanicId = req.body.mechanicId;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(RequestForMech.findByIdAndUpdate(req.params.id, {
            mechanicId: req.body.mechanicId
          }, {
            "new": true
          }).populate("userId", "-password").populate("mechanicId", "-password"));

        case 4:
          accepting = _context5.sent;

          if (accepting) {
            res.status(200).json(accepting);
          }

          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          res.status(400).json(_context5.t0);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); //this route will get all the repair a particular mechanic have completed
//so they know how much they are doing on the platform
//the only parameter you need is the mechanicId

var getMehanicCompletedRepair = asyncHandler(function _callee6(req, res) {
  var mechanicId, mechanicRapairCount;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          mechanicId = req.body.mechanicId;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(RequestForMech.find({
            $and: [{
              mechanicId: {
                $eq: mechanicId
              }
            }, {
              completed: true
            }]
          }).populate("userId", "-password").exec());

        case 4:
          mechanicRapairCount = _context6.sent;
          return _context6.abrupt("return", res.status(200).json(mechanicRapairCount));

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](1);
          res.status(400).json(_context6.t0);

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
var getSingleMechRequest = asyncHandler(function _callee7(req, res) {
  var getSiglerequest;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(RequestForMech.findById(req.params.id).populate("userId", "-password").populate("mechanicId", "-password"));

        case 3:
          getSiglerequest = _context7.sent;
          res.status(200).json(getSiglerequest);
          _context7.next = 10;
          break;

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          res.status(400).json(_context7.t0);

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //this route take care of mechanic_rating and service rating as well as calculating
//average mechanic rating and it is only done when completed is true

var mechanicRating = asyncHandler(function _callee8(req, res) {
  var _req$body2, mechanicId, service_rating, mechanic_rating, getThisService, rateMechanic, getMechanicFromRequest, answerArray, sum, i, mechanicAverageRating;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _req$body2 = req.body, mechanicId = _req$body2.mechanicId, service_rating = _req$body2.service_rating, mechanic_rating = _req$body2.mechanic_rating;
          _context8.next = 3;
          return regeneratorRuntime.awrap(RequestForMech.findById(req.params.id));

        case 3:
          getThisService = _context8.sent;

          if (getThisService.completed) {
            _context8.next = 6;
            break;
          }

          throw new Error("Thank you , kindly rate us after the service is completed");

        case 6:
          _context8.prev = 6;
          _context8.next = 9;
          return regeneratorRuntime.awrap(RequestForMech.findOneAndUpdate(req.params.id, {
            service_rating: req.body.service_rating,
            mechanic_rating: req.body.mechanic_rating
          }, {
            "new": true
          }));

        case 9:
          rateMechanic = _context8.sent;
          getThisService.service_rating = service_rating;
          getThisService.mechanic_rating = mechanic_rating;
          _context8.next = 14;
          return regeneratorRuntime.awrap(getThisService.save());

        case 14:
          _context8.next = 16;
          return regeneratorRuntime.awrap(RequestForMech.find({
            $and: [{
              completed: true
            }, {
              mechanicId: {
                $eq: mechanicId
              }
            }]
          }));

        case 16:
          getMechanicFromRequest = _context8.sent;
          answerArray = Object.values(getMechanicFromRequest);
          sum = 0;

          for (i = 0; i < answerArray.length; i++) {
            sum += answerArray[i].mechanic_rating;
          }

          mechanicAverageRating = sum / answerArray.length;
          _context8.next = 23;
          return regeneratorRuntime.awrap(Mechanic.findOneAndUpdate({
            _id: mechanicId
          }, {
            rating: mechanicAverageRating
          }));

        case 23:
          _context8.t0 = res.status(200);
          _context8.next = 26;
          return regeneratorRuntime.awrap(getThisService.save());

        case 26:
          _context8.t1 = _context8.sent;
          return _context8.abrupt("return", _context8.t0.json.call(_context8.t0, _context8.t1));

        case 30:
          _context8.prev = 30;
          _context8.t2 = _context8["catch"](6);
          res.status(400).json(_context8.t2);

        case 33:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[6, 30]]);
});
module.exports = {
  requestMechanic: requestMechanic,
  editARequests: editARequests,
  getSingleUserMechRequest: getSingleUserMechRequest,
  getAllMechanicRequest: getAllMechanicRequest,
  mechanicAcceptMechRequest: mechanicAcceptMechRequest,
  getMehanicCompletedRepair: getMehanicCompletedRepair,
  getSingleMechRequest: getSingleMechRequest,
  mechanicRating: mechanicRating
};