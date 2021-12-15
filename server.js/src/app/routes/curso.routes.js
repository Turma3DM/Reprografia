const { authJwt } = require("../middlewares");
const controller = require("../controllers/curso.controller");

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
    app.get("/cursos/enabled=:enabled",
        [
            authJwt.validateToken
        ],
        controller.cursoGet
    );

    // Exibindo um departamento por id para o Administrador
    app.get("/curso/:id/",
        [
            authJwt.validateToken,
            authJwt.isAdmin
        ],
        controller.cursoGetByPk
    );

    // POST

    // Criando um departamento
    app.post("/curso",
        [
            authJwt.validateToken, authJwt.isAdmin
        ],
        controller.cursoPost
    );

    // PUT

    // Rota para ativar/desativar o serviço
    app.put("/curso/:id/enable=:enable",
        [
            authJwt.validateToken, authJwt.isAdmin
        ],
        controller.enableOrDisableCurso
    );


    //   // Alterando quantidade e valor unitário do serviço
    //   app.put("/depto/:id/",
    //     [
    //       authJwt.validateToken,
    //       authJwt.isAdmin
    //     ],
    //     controller.servicosPut
    //   );


    // DELETE

    // Rota para deletar o serviço
    // app.delete(service/:id/type=:type)
};
