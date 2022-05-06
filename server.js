const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDb = require("./db/mongo");
const {
	notFound,
	errorHandler
} = require("./middleware/errorHandlerMiddlerware");
const { v1 } = require("./version/version1");
const PORT = process.env.PORT || 3000;

const app = express();
connectDb();

app.get("/", (req, res) => {
	res.send("Welcome to transol api v1");
});

app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());

app.use("/api/v1", v1);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`app is running on port on ${PORT} `);
});
