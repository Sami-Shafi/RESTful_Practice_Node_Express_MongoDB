require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
	.connect(process.env.DB_URL, { UseNewUrlParser: true })
	.then(() => console.log("DB connection established!"))
	.catch((err) => console.error("There is a problem" + err));

app.use(express.json());
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(3000, () => {
	console.log("Server Started!");
});
