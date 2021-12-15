const { authJwt } = require("../middlewares");
const controller = require("../controllers/centro_custos.controller");

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

    // Exibindo departamentos para o Administrador (ele passa os serviços ativos pra qualquer
    // usuário e inativos somente para o administrador => Regra na controller)
    app.get("/centroCustos/enabled=:enabled",
        [
            authJwt.validateToken
        ],
        controller.centroCustosGet
    );

    // Exibindo um departamento por id para o Administrador
    app.get("/centroCusto/:id/",
        [
            authJwt.validateToken,
            authJwt.isAdmin
        ],
        controller.centroCustosGetByPk
    );

    // POST

    // Criando um departamento
    app.post("/centroCustos",
        [
            authJwt.validateToken, authJwt.isAdmin
        ],
        controller.centroCustosPost
    );

    // PUT

    // Rota para ativar/desativar o serviço
    app.put("/centroCusto/:id/enable=:enable",
        [
            authJwt.validateToken, authJwt.isAdmin
        ],
        controller.enableOrDisableCentroCustos
    );


    //   // Alterando descricao do centro de custos
    //   app.put("/centroCusto/:id/",
    //     [
    //       authJwt.validateToken,
    //       authJwt.isAdmin
    //     ],
    //     controller.servicosPut
    //   );


    // DELETE

    // Rota para deletar um centro de custos
    // app.delete(centroCusto/:id/)
};
