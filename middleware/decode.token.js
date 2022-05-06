const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const decode_token = (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		const bearerHeader = req.headers.authorization;
		if (typeof bearerHeader !== undefined) {
			const bearer_token = bearerHeader.split(" ")[1];
			const user = jwt.verify(bearer_token, process.env.TOKEN_SECRET);
			console.log("user", user);
			return user;
		} else {
			res.status(404);
			throw new Error("User not available");
		}
	}
};

// export default user_value = decode_token();
module.exports = decode_token;
