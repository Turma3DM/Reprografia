const { authJwt } = require("../middlewares");
const { upload } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/usuario.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "accessToken, Origin, Content-Type, Accept"
    );
    next();
  });

  //Exibe informações do usuário logado
  app.get("/auth",
    [authJwt.validateToken], (req, res) => {
      res.json(req.user);
    });


  ////USUARIO COMUM

  //POST

  //Logando e recebendo token jwt
  app.post("/login",
    controller.logar
  );


  //GET

  //Exibe as informações basicas do usuário logado (autenticado pelo jwt)
  app.get("/myUser",
    [
      authJwt.validateToken
    ],
    controller.informacoesBasicas
  );

  //Exibe o usuárío por nif na tabela usuário (exemplo: host:porta/33321)
  app.get("/user/:nif",
    [
      authJwt.validateToken
    ],
    controller.buscarPorNif
  );


  //PUT

  //Alterando a senha do usuário no primeiro acesso.
  app.put("/myUser/firstAccess",
    [
      authJwt.validateToken
    ],
    controller.primeiroAcesso
  );

  //Altera as informações do usuário logado (autenticado pelo jwt) => Faz upload e atualiza imagem do usuário
  app.put('/myUser',
    [
      authJwt.validateToken
    ],
    upload.single('image'),
    controller.alterarMeuUsuario
  );

  //Rota para atualizar a própria senha
  app.put("/myUser/changePassword",
    [
      authJwt.validateToken
    ],
    controller.alterarSenha
  );

  //Rota para desativar o próprio usuário
  app.put('/myUser/disable',
    [
      authJwt.validateToken
    ],
    controller.desativarMeuUsuario
  );


  //ADMIN

  //POST

  //Registrando Usuário
  app.post(
    "/newUser",
    [
      authJwt.validateToken,
      authJwt.isAdmin
    ],
    upload.single('image'),
    [
      verifySignUp.checkDuplicateNifOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.adicionarUsuario
  );


  //GET

  //Exibe todos os usuários ativos da tabela usuário
  app.get("/users/enabled=:enabled",
    [
      authJwt.validateToken,
      authJwt.isAdmin
    ],
    controller.buscarTodos
  );

  //Exibe o usuárío por nome na tabela usuário (exemplo: host:porta/usuariox)
  app.get("/user/name/:user",
    [
      authJwt.validateToken,
      authJwt.isAdmin
    ],
    controller.buscarPorNome
  );


  //PUT

  //Rota para alterar um usuário da tabela usuario por NIF //Rota para administrador (pode colocar o nif que quiser)
  app.put('/user/:nif',
    [
      authJwt.validateToken,
      authJwt.isAdmin
    ],
    upload.single('image'),
    controller.alterarPorNif
  );

  //Rota para habilitar/desabilitar o usuário, passando nif como parâmetro
  app.put("/user/:nif/enable=:enable",
    [
      authJwt.validateToken,
      authJwt.isAdmin
    ],
    controller.enableOrDisableAccount
  );

  //DELETE

  //Rota para deletar um usuario da tabela usuario por NIF //Rota para administrador (pode colocar o nif que quiser)
  // app.delete('/user/:nif', [authJwt.validateToken, authJwt.isAdmin], controller.excluirPorNif);
};