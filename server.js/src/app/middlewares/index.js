const upload = require("./multer");
const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const verifyService = require("./verifyService");

module.exports = {
  upload,
  authJwt,
  verifySignUp,
  verifyService,
};