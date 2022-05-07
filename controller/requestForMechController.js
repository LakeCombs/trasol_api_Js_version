const asyncHandler = require("express-async-handler");
const RequestForMech = require("../model/requestForMechanic");
const Mechanic = require("../model/mehanicModel");
const Subscription = require("../model/subscription.model");
const User = require("../model/userModel");

// i am enforcing these parameter because they are the least requirement
// to request a mechanic and those error are for you to know what is missing
// when you encounter error in the frontend also if the user subscription plan repair option is 0 or less
//the function will throw an error
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

	const getUser = await User.findOne({ _id: userId }).populate({
		path: "finance",
		populate: { path: "subscription_plan" }
	});

	const get_repair_left = await Subscription.findById(
		getUser.finance.subscription_plan._id
	);

	if (get_repair_left.repairs <= 0) {
		res.status(403);
		throw new Error(
			"sorry you cannot request for mechanic, subscribe and try again"
		);
	} else {
		try {
			const requesting = await RequestForMech.create(req.body);

			res.status(200).json(requesting);
		} catch (error) {
			res.status(400).json(error);
		}
	}
});

//this route need the id of the requst for mechanic and is updated by the mechanics
//indicating he has started the repair
const mech_start_repairs = asyncHandler(async (req, res) => {
	try {
		const start_repair = await RequestForMech.findByIdAndUpdate(
			req.params.id,
			{
				start_time: Date.now(),
				start_task: true
			},
			{ new: true }
		);
		const get_user = await User.findById(start_repair.userId).populate({
			path: "finance",
			populate: { path: "subscription_plan" }
		});
		const user_subscription = get_user.finance.subscription_plan._id;
		const get_subscription = await Subscription.findById(user_subscription);
		const updated_repairs_count = get_subscription.repairs - 1;

		await Subscription.findByIdAndUpdate(
			user_subscription,
			{
				repairs: updated_repairs_count
			},
			{ new: true }
		);

		res.status(202).json(start_repair);
	} catch (error) {
		res.status(400).json(error);
	}
});

//this route take the id of the request for mech and it been updated by the s
//mechanic
const mech_finish_repair = asyncHandler(async (req, res) => {
	try {
		const finsh_repair = await RequestForMech.findByIdAndUpdate(
			req.params.id,
			{
				finish_time: Date.now(),
				finish_task: true
			},
			{ new: true }
		);

		res.status(202).json(finsh_repair);
	} catch (error) {
		res.status(400).json(error);
	}
});

// this route takes care of the user adding a comment,
//as well as GPS location and description except mechanicId
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
		completed: req.body.completed
	};

	//note this function is not taking care of mechanic rating because the rating will be an average
	// and i need some more logic to put in place

	try {
		const editingRequest = await RequestForMech.findByIdAndUpdate(
			req.params.id,
			requestEdit,
			{
				new: true
			}
		);

		const mechanicId = editingRequest.mechanicId;

		// this condition only work when the user put in completed from the frontend
		if (editingRequest.completed === true) {
			const Repairer = await Mechanic.findOne({
				_id: mechanicId
			});
			Repairer.completedRepairs = [
				...Repairer.completedRepairs,
				editingRequest._id
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
			userId: { $eq: userId }
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
			{ mechanicId: req.body.mechanicId },
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
			$and: [{ mechanicId: { $eq: mechanicId } }, { completed: true }]
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

//this route take care of mechanic_rating and service rating as well as calculating
//average mechanic rating and it is only done when completed is true
const mechanicRating = asyncHandler(async (req, res) => {
	const { mechanicId, service_rating, mechanic_rating } = req.body;

	const getThisService = await RequestForMech.findById(req.params.id);

	if (!getThisService.completed) {
		throw new Error(
			"Thank you , kindly rate us after the service is completed"
		);
	}

	try {
		const rateMechanic = await RequestForMech.findOneAndUpdate(
			req.params.id,
			{
				service_rating: req.body.service_rating,
				mechanic_rating: req.body.mechanic_rating
			},
			{ new: true }
		);

		getThisService.service_rating = service_rating;
		getThisService.mechanic_rating = mechanic_rating;
		await getThisService.save();

		const getMechanicFromRequest = await RequestForMech.find({
			$and: [{ completed: true }, { mechanicId: { $eq: mechanicId } }]
		});

		const answerArray = Object.values(getMechanicFromRequest);

		let sum = 0;

		for (let i = 0; i < answerArray.length; i++) {
			sum += answerArray[i].mechanic_rating;
		}

		const mechanicAverageRating = sum / answerArray.length;

		await Mechanic.findOneAndUpdate(
			{
				_id: mechanicId
			},
			{ rating: mechanicAverageRating }
		);

		return res.status(200).json(await getThisService.save());
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
	mechanicRating,
	mech_start_repairs,
	mech_finish_repair
};
