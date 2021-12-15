
const mysql = require('mysql2/promise');

const config = require("../config/").dbConfig;

const dbName = config.database || "YOUR_DB";

const createDatabase = async () => {
    try {
        await mysql.createConnection({
            host: config.host || "127.0.0.1",
            port: config.port || "3306",
            user: config.username || "root",
            password: config.password || "",
        }).then(connection => {
            connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then(() => {
                console.info(`Banco de dados ${dbName} criado ou verificado com sucesso!`);

            });
        });
        return;
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = createDatabase;