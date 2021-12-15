const { authJwt } = require("../middlewares");
const controller = require("../controllers/detPedido.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "accessToken, Origin, Content-Type, Accept"
    );
    next();
  });

  //// USUARIO COMUM

  // GET

  // Buscar pedido por id do pedido
  app.get("/requestDetails/:id",
    [
      authJwt.validateToken
    ],
    controller.buscarPorIdPedido
  );
};