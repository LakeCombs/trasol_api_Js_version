const express = require("express");
const {
	user_add_subscription,
	renew_subscription,
	get_all_subscriptions_plan,
	get_subscription_by_user,
	get_subscription_by_plan
} = require("../controller/subscription.controller");

const subscription_route = express.Router();

subscription_route.post("/", user_add_subscription);
subscription_route.post("/renew_subscription", renew_subscription);
subscription_route.get("/all", get_all_subscriptions_plan);
subscription_route.get("/user_subscription", get_subscription_by_user);
subscription_route.get("/get_by_plan", get_subscription_by_plan);

module.exports = subscription_route;
