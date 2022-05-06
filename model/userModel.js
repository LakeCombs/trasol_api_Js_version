const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Vehicle = require("./vehicleModels");
const Report = require("./reportModel");
const Subscription = require("./subscription.model");

const userModel = mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match:
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		},
		password: {
			type: String,
			required: true
		},
		phone: { type: String },
		photo: {
			type: String,
			default:
				"https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png"
		},

		finance: {
			subscription_plan: {
				type: mongoose.Schema.Types.ObjectId,
				ref: Subscription
			},
			acct_details: { type: String },
			transaction_hist: []
		},

		activity: {
			rating: {
				ratingNo: { type: Number, default: 0 },
				no_of_reviews: { type: Number, default: 0 }
			}
		},
		reports: [{ type: mongoose.Schema.Types.ObjectId, ref: Report }],

		fleet: {
			fleet_size: { type: Number, default: 0 },
			total_repairs: { type: Number, default: 0 },
			vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: Vehicle }]
		}
	},

	{ timestamps: true }
);

userModel.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userModel.pre("save", async function (next) {
	if (!this.isModified) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userModel);
