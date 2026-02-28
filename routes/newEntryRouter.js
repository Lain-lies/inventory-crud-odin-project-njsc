const express = require("express");
const newEntryRouter = express.Router();
const { getNewEntryController } = require("../controllers/controller");

newEntryRouter.get("/", getNewEntryController);
newEntryRouter.post("/", express.json(), (req, res) => console.log(req.body));
module.exports = newEntryRouter;
