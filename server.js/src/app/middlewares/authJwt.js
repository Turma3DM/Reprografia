//Arquivo de configuração
const config = require("../../config/").authConfig;
//Método que verifica o token enviado na requisição com o token e a palavra de segurança setada no back-end
const { verify } = require("jsonwebtoken");

//Service do usuário
const service = require("../services/usuario.service");

//Verifica se a requisição contém os valores setados no config.header e no config.secret
const validateToken = (req, res, next) => {
  const accessToken = req.header(config.jwt.header);

  if (!accessToken) {
    res.status(403).json({ status: "error", message: "Você não está logado!" });
    return;
  }
  try {
    const validToken = verify(accessToken, config.jwt.secret);
    //  ==>  //Aqui ele passa os dados do usuário, nif: ... , email: ... 
    //Importante para usarmospor exemplo quando alguém realizar um pedido, 
    //para sabermos quem foi que realizou aquele pedido.
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (error) {
    res.json({ error })
  }
};

isAdmin = (req, res, next) => {
  service.findUserbyPk(req.user.nif, { attributes: null }).then(user => {
    service.getRoles(user).then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].descricao === "admin") {
          if (next) {
            next();
            return;
          }

          //Exceção para detPedidos... Para podermos verificar se o usuário é admin após verificar se
          // o nif do pedido que ele está tentando acessar é igual ao dele (foi ele que requisitou)
          //se não for, verificamos se ele é admin, se for ele recebe a array do pedido que solicitou
          //se ele não for admin, recebe a mensagem abaixo "Você precisa ser Administrador...".
          else {
            return res.status(200).json(req.array);
          }
        }
      }
      // res.redirect("/teste");
      return res.status(403).json({
        status: "error",
        message: "Você precisa ser Administrador para executar essa ação!"
      });
    });
  });
};

const authJwt = {
  validateToken: validateToken,
  isAdmin: isAdmin,
};

module.exports = authJwt;
