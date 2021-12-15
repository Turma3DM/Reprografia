const swaggerUi = require("swagger-ui-express");
const swaggerDocsV1 = require("../../swagger/v1/swaggerV1.json");
const swaggerDocsV2 = require("../../swagger/v2/swaggerV2.json");
const swaggerDocsV3 = require("../../swagger/v3/swaggerV3.json");

module.exports = function (app) {
  //Swagger Routes

  // //Versão 1
  app.use('/v1/docs',
    swaggerUi.serve, (...args) => {
      swaggerUi.setup(swaggerDocsV1)(...args);
    });


  // //Versão 2
  app.use('/v2/docs',
    swaggerUi.serve, (...args) => {
      swaggerUi.setup(swaggerDocsV2)(...args);
    });


  // //Versão 3 (principal)
  app.use('/docs',
    swaggerUi.serve, (...args) => {
      swaggerUi.setup(swaggerDocsV3)(...args);
    });

};
