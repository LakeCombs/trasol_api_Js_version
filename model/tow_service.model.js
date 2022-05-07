const mongoose = require("mongoose");

const towing_schema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		GPSlocation: { type: String, required: true },
		confirm: { type: Boolean }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Tow", towing_schema);
