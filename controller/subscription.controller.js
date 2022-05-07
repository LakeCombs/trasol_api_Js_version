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
		const user_subscription = await Subscription.findOne({
			_id: getUser.finance.subscription_plan._id
		});
		const user_current_subscription = user_subscription.subscription_plan;

		console.log("current plan", user_current_subscription);

		//the rollover for the same subscription_plan isn't workin yet but
		// the function works for normal subscription plan
		if (subscription_plan === "starter") {
			if (user_current_subscription === "starter") {
				user_subscription.repairs = user_subscription.repairs + 4;
				console.log("check this update", user_subscription.repairs);
				user_subscription.tow_serice = user_subscription.tow_serice + 2;
			} else {
				user_subscription.subscription_plan = "starter";
				user_subscription.repairs = 4;
				user_subscription.tow_service = 2;
				user_subscription.unlimited_support = false;
				user_subscription.choose_a_specialist = false;
				user_subscription.help_a_friend = false;
				user_subscription.alternative_free_ride = false;
			}
		} else if (subscription_plan === "classic") {
			if (user_current_subscription == "classic") {
				user_subscription.repairs = +8;
				user_subscription.tow_serice = +4;
			} else {
				user_subscription.subscription_plan = "classic";
				user_subscription.repairs = 8;
				user_subscription.tow_service = 4;
				user_subscription.unlimited_support = false;
				user_subscription.choose_a_specialist = false;
				user_subscription.help_a_friend = false;
				user_subscription.alternative_free_ride = false;
			}
		} else if (subscription_plan === "luxuriate") {
			if (user_current_subscription === "luxuriate") {
				user_subscription.repairs = +1000;
				user_subscription.tow_serice = +1000;
			} else {
				user_subscription.subcription_plan = "luxuriate";
				user_subscription.repairs = 1000;
				user_subscription.tow_service = 1000;
				user_subscription.unlimited_support = true;
				user_subscription.choose_a_specialist = true;
				user_subscription.help_a_friend = true;
				user_subscription.alternative_free_ride = true;
			}
		} else {
			res.status(400);
			throw new Error("please choose a subscription plan");
		}

		const updated_subscription_plan = await user_subscription.save();
		res.status(201).json(updated_subscription_plan);
	} catch (error) {
		res.status(400).json(error);
	}
});

const get_all_subscriptions_plan = asyncHandler(async (req, res) => {
	try {
		const all_subscriptions = await Subscription.find().populate(
			"userId",
			"email firstName lastName phone fleet"
		);
		res.status(200).json(all_subscriptions);
	} catch (error) {
		res.status(401).json(error);
	}
});

//you can get user subscription with either there userId or their email
const get_subscription_by_user = asyncHandler(async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email: email });
	try {
		if (!user) {
			res.status(404);
			throw new Error("the email does not belong to any user");
		}
		const subscription_id = user.finance.subscription_plan._id;
		const user_subscription = await Subscription.findById({
			_id: subscription_id
		}).populate("userId", "email firstName lastName phone fleet");

		if (!user_subscription) {
			res.status(404);
			throw new Error("Sorry this user does not have a subscription plan");
		}

		res.status(200).json(user_subscription);
	} catch (error) {
		res.status(400).json(error);
	}
});

const get_subscription_by_plan = asyncHandler(async (req, res) => {
	const { subscription_plan } = req.body;
	try {
		const by_subscription_plan = await Subscription.find({
			subscription_plan: subscription_plan
		}).populate("userId", "email firstName lastName phone fleet");
		res.status(200).json(by_subscription_plan);
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = {
	user_add_subscription,
	renew_subscription,
	get_all_subscriptions_plan,
	get_subscription_by_user,
	get_subscription_by_plan
};
