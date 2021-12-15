module.exports = {
    username: process.env.DB_USER ? process.env.DB_USER : "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE ? process.env.DB_DATABASE : "teste",
    host: process.env.DB_HOST ? process.env.DB_HOST : "localhost",
    port: process.env.DB_PORT ? process.env.DB_PORT : 3306,
    dialect: process.env.DB_DIALECT ? process.env.DB_DIALECT : "mariadb",
    dialectOptions: {
        useUTC: false,
        dateStrings: true,
        typeCast: true
    },
    timezone: "-03:00"
};
