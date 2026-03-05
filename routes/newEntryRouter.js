const express = require("express");
const newEntryRouter = express.Router();
const { getNewEntryController } = require("../controllers/controller");
const {isDevExist} = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");
const validators = [
	body("dev")
	.notEmpty()
	.withMessage("Field cannot be empty")
	.trim()
	.escape()
	.custom(async value => {
		const devExist = await isDevExist(value);

		if(!devExist){
      		throw new Error('Entry error: Dev name doesn\`t exist');
		}
	}),
	// body("games")
    // .custom(value => {
    //   if (!Array.isArray(value)) {
    //     return [value];
    //   }
    //   return value;
    // }),
	// body("games.*")
	// .notEmpty()
	// .withMessage("Field cannot be empty")
	// .trim()
	// .escape()
]

newEntryRouter.get("/", getNewEntryController);
newEntryRouter.post(
	"/",
	express.urlencoded({ extended: true }),
	validators,
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(`Error Occured: ${errors.array()}`);
			return res.send({error: errors.array()});
		}

		res.send("<h1>Success<h1>");
	},
);

module.exports = newEntryRouter;
