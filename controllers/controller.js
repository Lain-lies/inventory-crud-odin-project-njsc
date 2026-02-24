const fetchAllGames = require("../db/queries");

async function getIndexController(req, res) {
	const data = await fetchAllGames();
	res.render("index", { publishers: data });
}
module.exports = getIndexController;
