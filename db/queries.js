const pool = require("./pool");


async function getAllGames(){
    const {rows} = await pool.query(
        `
        SELECT * 
        FROM developers
        INNER JOIN games
        ON developers.id = games.developer_id
        ORDER BY developers.id

        `
    )
}
