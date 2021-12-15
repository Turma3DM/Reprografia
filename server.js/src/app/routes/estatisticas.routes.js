const { authJwt } = require("../middlewares");
const controller = require("../controllers/estatisticas.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "accessToken, Origin, Content-Type, Accept"
        );
        next();
    });

    // ADMIN

    // GET

    // Estatísticas mensais, passando parâmetros de ano e mês.
    app.get("/estatisticas/mensais/:ano/:mes",
        [
            authJwt.validateToken,
            authJwt.isAdmin
        ],
        controller.estatisticasMensais
    );

    // Estatísticas dos ultimos quatro meses.
    app.get("/estatisticas/quatroMeses",
        [
            authJwt.validateToken,
            authJwt.isAdmin
        ],
        controller.estatisticasQuatroMeses
    );
};