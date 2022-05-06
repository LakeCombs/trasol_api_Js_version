const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const generateToken = require("../middleware/generateToken");
const decode_token = require("../middleware/decode.token");
const jwt = require("jsonwebtoken");
const Subscription = require("../model/subscription.model");

//to use this route you need the userId and the subscription plan
//the 3 plan are "starter", "classic", "luxuriate"
//note the plan have to be spelt like this
const user_add_subscription = asyncHandler(async (req, res) => {
	const { userId, subscription_plan } = req.body;
	if (!subscription_plan) {
		throw new Error("Please choose a subscription_plan");
	}
	try {
		const user_subscription = await Subscription.create(req.body);
		//update user profile to contain the subscription plans
		await User.findByIdAndUpdate(
			{ _id: userId },
			{ $set: { "finance.subscription_plan": user_subscription._id } }
		);

		res.status(200).json(user_subscription);
	} catch (error) {
		res.status(401).json(error);
	}
});

//still working on this route
const renew_subscription = asyncHandler(async (req, res) => {
	const { userId, subscription_plan } = req.body;
	try {
		const getUser = await User.findOne({ _id: userId });
		const user_subscription_plan_id = getUser.finance.subscription_plan;
		const the_subscription = await Subscription.findOne({
			_id: user_subscription_plan_id
		});
		// exec(function (error, the_subscription) {
		// 	if (error) {
		// 		throw new Error(error);
		// 	}
		// 	return the_subscription.roll_over_subscription(subscription_plan);
		// });

		// .console.log("sub_plan", the_subscription);

		const renewing = await the_subscription.roll_over_subscription(
			subscription_plan
		);
		res.status(201).json(renewing);

		console.log("new", renewing);
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = {
	user_add_subscription,
	renew_subscription
};
