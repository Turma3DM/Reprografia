require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const authConfig = require("./auth.config");
const dbConfig = require("./db.config");
const mailerConfig = require("./mailer.config");

module.exports = {
    authConfig: authConfig,
    dbConfig: dbConfig,
    mailerConfig: mailerConfig
};