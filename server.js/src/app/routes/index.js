const express = require("express");

const app = express();

require("./usuario.routes")(app);
require("./pedido.routes")(app);
require("./detPedido.routes")(app);
require("./resetToken.routes")(app);
require("./servico.routes")(app);
require("./estatisticas.routes")(app);
require("./swagger.routes")(app);
require("./feedback.routes")(app);
require("./departamento.routes")(app);
require("./centro_custos.routes")(app);
require("./curso.routes")(app);

module.exports = app;