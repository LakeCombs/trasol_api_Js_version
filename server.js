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
const socket = require("socket.io");
const http = require("http");
const server = http.createServer(app);
// const io = socket(server, { cors: { origin: "*" } });

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

server.listen(PORT, () => {
	console.log(`app is running on port on ${PORT} `);
});

// let users = [];
// const calculate_timer = io.on("connection", (socket) => {
// 	console.log("user connected", socket.id);

// 	socket.on("request for mech", (request_for_mech_id) => {
// 		const user = {
// 			request_for_mech_id,
// 			id: socket.id
// 		};
// 		users.push(user);
// 		io.emit("new repair", users);
// 	});

// 	socket.on("start_repair", ({ mechanicId, to, userId, finish_task }) => {
// 		const total_cost = 10000;
// 		setTimeout(() => {
// 			console.log("I hour is done");
// 		}, 3.6e6).then(() => {
// 			do {
// 				setTimeout(() => {
// 					total_cost += 5000;
// 				}, 1.8e6);
// 			} while ((finish_task = false));
// 		});

// 		socket.to(to).emit("finish task", payload);
// 	});

// 	socket.on("disconnect", () => {
// 		users = users.filter((u) => u.id !== socket.id);
// 		io.emit("new user", users);
// 	});
// });

// module.exports = calculate_timer;
