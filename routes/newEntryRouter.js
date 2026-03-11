const express = require("express");
const newEntryRouter = express.Router();
const { getNewEntryController } = require("../controllers/controller");
const { isDevExist, insertNewGame } = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");
const validators = [
	body("dev")
		.notEmpty()
		.withMessage("Field cannot be empty")
		.trim()
		.escape()
		.custom(async (value, { req }) => {
			const dev = await isDevExist(value);
			console.log(dev);
			if (Object.keys(dev).length === 0) {
				throw new Error("Developer name doesn't exist");
			}
			req.body.devId = dev.id;
		}),

	body("games").custom((value) => {
		if (!Array.isArray(value)) {
			return [value];
		}
		return value;
	}),

	body("games.*")
		.notEmpty()
		.withMessage("Field cannot be empty")
		.trim()
		.escape(),
];

newEntryRouter.get("/", getNewEntryController);
newEntryRouter.post(
	"/",
	express.urlencoded({ extended: true }),
	validators,
	async (req, res) => {
		console.log(req.body);
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(`Error Occured: ${errors.array()}`);
			return res.send({ error: errors.array() });
		}

		const result = await insertNewGame(req.body.devId, req.body.games);
		if (!result) {
			res.status = 500;
			res.send("Error: DB error");
		}
		res.send("<h1>Success<h1>");
	},
);

module.exports = newEntryRouter;
