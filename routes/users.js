const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const User = require("../models/user");

// this is a middleware for finding id as it is needed for almost every request
const getUserById = async (req, res, next) => {
	try {
		let user = await User.findById(req.params.id);
		if (user == undefined || !mongoose.isValidObjectId(req.params.id)) {
			return res.status(404).json({ message: "User not found." });
		}
		res.user = user;
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
	next();
};

// Get
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Get single
router.get("/:id", getUserById, (req, res) => {
	res.send(res.user);
});

// Create
router.post("/", async (req, res) => {
	const user = new User({
		name: req.body.name,
		subscribedTo: req.body.subscribedTo,
	});

	try {
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// update
router.patch("/:id", getUserById, (req, res) => {});

// delete
router.delete("/:id", getUserById, (req, res) => {});

module.exports = router;
