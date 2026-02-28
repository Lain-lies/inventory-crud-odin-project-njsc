const express = require("express");
const newEntryRouter = express.Router();
const {getNewEntryController} = require("../controllers/controller");

newEntryRouter.get("/", getNewEntryController);
newEntryRouter.post("/", (req, res) => console.log("post req received"));
module.exports = newEntryRouter;
