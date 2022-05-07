const asyncHandler = require("express-async-handler");
const Tow = require("../model/tow_service.model");
const User = require("../model/userModel");
const Subscription = require("../model/subscription.model");

const request_for_row = asyncHandler(async (req, res) => {
	const { userId, GPSlocation } = req.body;

	if (!GPSlocation) {
		res.status(400);
		throw new Error("Please enter your GPS location so we can find you");
	}

	const get_tow_left = await Subscription.findOne({ userId: userId });

	if (get_tow_left.tow_service <= 0) {
		res.status(400);
		throw new Error(
			"Sorry you cannot request a tow service, please subscribe and try again"
		);
	} else {
		try {
			const requestingTow = await Tow.create({ userId, GPSlocation });
			res.status(200).json(requestingTow);
		} catch (error) {
			res.status(400).json(error);
		}
	}
});

const get_all_tow = asyncHandler(async (req, res) => {
	try {
		const all_tow = await Tow.find();
		res.status(200).json(all_tow);
	} catch (error) {
		res.status(400).json(error);
	}
});

const get_all_tow_by_user = asyncHandler(async (req, res) => {
	const { userId } = req.body;
	try {
		const get_all_user_tow = await Tow.find({ userId });
		res.status(200).json(get_all_user_tow);
	} catch (error) {
		res.status(404).json(error);
	}
});

//this route update the confirm tow all you need is the id
const confirm_tow = asyncHandler(async (req, res) => {
	try {
		const update_confirm = await Tow.findByIdAndUpdate(
			req.params.id,
			{ confirm: true },
			{ new: true }
		);

		const get_subscription_id = await User.findOne({
			_id: update_confirm.userId
		});

		const subscription_id = get_subscription_id.finance.subscription_plan;
		const user_subsciption = await Subscription.findOne({
			_id: subscription_id
		});

		const new_tow_count = user_subsciption.tow_service - 1;
		const last = await Subscription.findByIdAndUpdate(
			subscription_id,
			{ tow_service: new_tow_count },
			{ new: true }
		);
		console.log("check this ", last);
		res.status(202).json(update_confirm);
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = {
	request_for_row,
	get_all_tow,
	get_all_tow_by_user,
	confirm_tow
};
