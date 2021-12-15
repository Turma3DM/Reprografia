const { authJwt } = require("../middlewares");
const controller = require("../controllers/servico.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "accessToken, Origin, Content-Type, Accept"
    );
    next();
  });

  ////ADMIN

  //GET

  // Exibindo serviços para o Administrador (ele passa os serviços ativos pra qualquer
  // usuário e inativos somente para o administrador => Regra na controller)
  app.get("/services/enabled=:enabled",
    [
      authJwt.validateToken
    ],
    controller.servicosGet
  );

  // Exibindo serviços para o Administrador
  app.get("/service/:id/type=:type",
    [
      authJwt.validateToken,
      authJwt.isAdmin
    ],
    controller.servicosGetByPk
  );

  // POST

  // Criando um serviço especificando o tipo (pode ser ct ou ca)
  app.post("/service/type=:type",
    [
      authJwt.validateToken, authJwt.isAdmin
    ],
    controller.servicosPost
  );

  // PUT

  // Alterando quantidade e valor unitário do serviço
  app.put("/service/:id/type=:type",
    [
      authJwt.validateToken,
      authJwt.isAdmin
    ],
    controller.servicosPut
  );

  // Rota para ativar/desativar o serviço
  app.put("/service/:id/type=:type/enable=:enable",
    [
      authJwt.validateToken, authJwt.isAdmin
    ],
    controller.enableOrDisableServico
  );

  // DELETE

  // Rota para deletar o serviço
  // app.delete(service/:id/type=:type)
};
