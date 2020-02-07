const maria = require('mariadb');

const pool = maria.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const query = async (queryString) => {
    let conn;
    let res;
    try {

        conn = await pool.getConnection();
        res = await conn.query(queryString);

    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return res;
}

const queryOne = async (queryString) => (await query(queryString))[0];

module.exports = {
    query,
    queryOne
}