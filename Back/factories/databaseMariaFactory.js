const maria = require('mariadb');
const config = require('../config')

const pool = maria.createPool({
    host: config.host, 
    user: config.user, 
    password: config.password,
    database: config.database,
    port: config.port
});

const query = async (queryString) => {
    let conn;
    let res;
    try {

        conn = await pool.getConnection();
        res = await conn.query(queryString);

    } catch (err) {
        console.log(err);
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