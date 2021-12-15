const { authJwt } = require("../middlewares");
const controller = require("../controllers/feedback.controller");

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
    app.get("/feedbacks/:id",
        [
            authJwt.validateToken
        ],
        controller.todosFeedbackPorIdPedido
    );

    app.get("/feedback/id/:id",
        [
            authJwt.validateToken
        ],
        controller.buscarPorId
    );

    //PUT

    //rota para atualizar a avaliação
    app.put("/rating/:id",
        [
            authJwt.validateToken
        ],
        controller.alterarAvaliacao
    );
};