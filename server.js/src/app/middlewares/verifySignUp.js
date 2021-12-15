//Roles definidas em models/index.js (["user", "admin"])
const db = require("../../database");
const ROLES = db.ROLES;

//Service do Usuário
const service = require("../services/usuario.service");

//Verifica se já existe um usuário com NIF e/ou email passados pelo input 
checkDuplicateNifOrEmail = (req, res, next) => {
  // NIF
  service.findUserbyPk(req.body.nif, {attributes: null})
    .then(user => {
      if (user) {
        res.json({
          status: "error",
          message: "Error! Usuário já cadastrado!"
        });
        return;
      };

      // Email
      service.findOneByEmail(req.body.email)
      .then(user => {
        if (user) {
          res.json({
            status: "error",
            message: "Error! Email já cadastrado!"
          });
          return;
        }
        next();
      });
    });
};

//Verifica se o Cargo passado na hora do registro existe no back-end (existentes: User, Moderator, Admin)
checkRolesExisted = (req, res, next) => {

  //Transformando int em array para comparar se existe o Role em Models/Index.js. => ROLES
  var { admin } = req.body;

  if (admin === "1") {
    admin = ["admin"];
  }
  else {
    admin = ["user"];
  }

  if (admin) {
    for (let i = 0; i < admin.length; i++) {
      if (!ROLES.includes(admin[i])) {
        res.status(400).json({
          status: "error",
          message: "Role inexistente = " + admin[i]
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateNifOrEmail: checkDuplicateNifOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
