const pool = require("./pool");

async function fetchAllGames() {
	const { rows } = await pool.query(
		`
        SELECT developers.name,
        COALESCE(ARRAY_AGG(games.name), '{}') AS games
        FROM developers 
        LEFT JOIN games
        ON developers.id = games.developer_id
        GROUP BY developers.name
        `,
	);

	return rows;
}

async function fetchDevelopers() {
	const { rows } = await pool.query("SELECT name FROM developers ORDER BY name;");
    console.log(rows);
	return rows;
}

module.exports = {fetchAllGames, fetchDevelopers};
