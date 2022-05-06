const mongoose = require("mongoose");

const connectDb = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		console.log(`MongoDB connected: ${connect.connection.host}`);
	} catch (error) {
		console.log(`Mongo connection error: ${error.message}`);
		process.exit();
	}
};

module.exports = connectDb;
