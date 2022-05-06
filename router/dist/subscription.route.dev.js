"use strict";

var express = require("express");

var _require = require("../controller/subscription.controller"),
    user_add_subscription = _require.user_add_subscription,
    renew_subscription = _require.renew_subscription;

var subscription_route = express.Router();
subscription_route.post("/subscribe", user_add_subscription);
subscription_route.post("/renew_subscription", renew_subscription);
module.exports = subscription_route;