const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const generateToken = require("../middleware/generateToken");
const decode_token = require("../middleware/decode.token");
const Subscription = require("../model/subscription.model");

const RegisterUser = asyncHandler(async (req, res) => {
	const { email, password, firstName, lastName, phone } = req.body;
	if (!email || !firstName || !lastName || !password || !phone) {
		throw new Error("Please complete the required field");
	}
	const userExist = await User.findOne({ email });
	if (userExist) {
		throw new Error("User already exist");
	}

	try {
		const newUser = {
			firstName,
			lastName,
			email,
			password,
			phone
		};

		const user = await User.create(newUser);

		return res
			.status(201)
			.json({ user, token: generateToken(user._id) })
			.select("-password");
	} catch (error) {
		return res.status(400).json(error.message);
	}
});

// this is the login routes
const LoginUser = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new Error("fill in the required field");
	}
	//  options: {strictPopulate: false}}
	const user = await User.findOne({ email }).populate({
		path: "finance",
		populate: {
			path: "subscription_plan"
		}
	});

	const confirmPassword = await user.matchPassword(password);
	console.log(confirmPassword);

	try {
		if (user && (await user.matchPassword(password))) {
			console.log("user can now login");
			const UserObject = { user, token: generateToken(user._id) };
			res.status(201).json(UserObject);
		}

		if (!user) {
			res.status(404);
			throw new Error("User not found, register to login");
		}
	} catch (error) {
		res.status(400).json(error);
	}
});

//still working on this route because of te complexity of the element inside the object
const EditUser = asyncHandler(async (req, res) => {
	const {
		firstName,
		lastName,
		email,
		subscription,
		acct_details,
		ratingNo,
		no_of_reviews,
		password,
		phone,
		photo,
		total_repairs,
		fleet,
		reports,
		transaction_hist
	} = req.body;

	//new user object
	const newUserEdit = {
		firstName,
		lastName,
		email,
		password,
		phone,
		photo,
		finance: {
			subscription,
			acct_details,
			transaction_hist
		}
	};

	try {
		// console.log(await User.findOne(req.params.id));
		const updatingUser = await User.findByIdAndUpdate(
			req.params.id,
			// newUserEdit,
			req.body,
			{ returnOriginal: false }
		);
		res.status(200).json(editingUser);
	} catch (error) {
		res.status(404).json(error);
	}
});

const DeleteUser = asyncHandler(async (req, res) => {
	const { id: _id } = req.body;
	try {
		const delUser = await User.findOneAndDelete(req.params.id);
		if (delUser) {
			res.status(200).json(delUser);
		}
	} catch (error) {
		res.status(200).json(error);
	}
});

const getOneUser = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		return res.status(200).json(user);
	} catch (error) {
		res.json(400).json(error);
	}
});

const getAllUsers = asyncHandler(async (req, res) => {
	try {
		const allUser = await User.find();
		res.status(200).json(allUser);
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = {
	RegisterUser,
	LoginUser,
	EditUser,
	DeleteUser,
	getAllUsers,
	getOneUser
};
