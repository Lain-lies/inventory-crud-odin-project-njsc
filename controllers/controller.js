const {fetchAllGames, fetchDevelopers} = require("../db/queries");

async function getIndexController(req, res) {
	const data = await fetchAllGames();
	res.render("index", { publishers: data });
}

async function getNewEntryController(req, res){
	const data = await fetchDevelopers();
	res.render("newEntry", {developers: data});
}
module.exports = {getIndexController, getNewEntryController};
