const express = require("express");
const {
	user_add_subscription,
	renew_subscription
} = require("../controller/subscription.controller");

const subscription_route = express.Router();

subscription_route.post("/subscribe", user_add_subscription);
subscription_route.post("/renew_subscription", renew_subscription);

module.exports = subscription_route;
