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
	const { rows } = await pool.query(
		"SELECT name FROM developers ORDER BY name;",
	);
	console.log(rows);
	return rows;
}

async function isDevExist(value) {
	console.log(value);
	const { rows } = await pool.query(
		`
        SELECT id FROM developers
        WHERE name LIKE $1;
    `,
		[value],
	);
	if (rows.length === 0) return {};

	return rows[0];
}

async function insertNewGame(devId, names) {
	const formattedNames = names
		.map((_, index) => `(\$${index + 2}, $1)`)
		.join(",");
	const values = [devId, ...names];
	console.log(names);
	console.log(values);

	try {
		await pool.query(
			`
			INSERT INTO games (name, developer_id)
			VALUES ${formattedNames};`,
			values,
		);
		console.log("SUCCESS: Record inserted successfully");
		return true;
	} catch (err) {
		console.error("FAILURE: Record was not inserted.", err.message);
		return false;
	}
}

module.exports = { fetchAllGames, fetchDevelopers, isDevExist, insertNewGame };
