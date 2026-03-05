const express = require("express");
const newEntryRouter = express.Router();
const { getNewEntryController } = require("../controllers/controller");
const { body, validationResult, matchedData } = require("express-validator");
const validateDev = body("dev")
	.notEmpty()
	.withMessage("Field cannot be empty")
	.trim()
	.escape();

newEntryRouter.get("/", getNewEntryController);
newEntryRouter.post(
	"/",
	express.urlencoded({ extended: true }),
	validateDev,
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(`Error Occured: ${new Date().getTime()}`);
			return res.redirect("/");
		}

		res.send("<h1>Success<h1>");
	},
);

module.exports = newEntryRouter;
