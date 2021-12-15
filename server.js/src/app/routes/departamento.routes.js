const { authJwt } = require("../middlewares");
const controller = require("../controllers/departamento.controller");

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
    app.get("/deptos/enabled=:enabled",
        [
            authJwt.validateToken
        ],
        controller.departamentoGet
    );

    // Exibindo um departamento por id para o Administrador
    app.get("/depto/:id/",
        [
            authJwt.validateToken,
            authJwt.isAdmin
        ],
        controller.departamentoGetByPk
    );

    // POST

    // Criando um departamento
    app.post("/depto",
        [
            authJwt.validateToken, authJwt.isAdmin
        ],
        controller.departamentoPost
    );

    // PUT

    // Rota para ativar/desativar o serviço
    app.put("/depto/:id/enable=:enable",
        [
            authJwt.validateToken, authJwt.isAdmin
        ],
        controller.enableOrDisableDepto
    );


    //   // Alterando descrição de um depto
    //   app.put("/depto/:id/",
    //     [
    //       authJwt.validateToken,
    //       authJwt.isAdmin
    //     ],
    //     controller.servicosPut
    //   );


    // DELETE

    // Rota para deletar um departamento
    // app.delete(service/:id/)
};
