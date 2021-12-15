var DataTypes = require("sequelize").DataTypes;
var _avaliacao_pedido = require("./avaliacao_pedido");
var _centro_custos = require("./centro_custos");
var _curso = require("./curso");
var _departamento = require("./departamento");
var _det_pedido = require("./det_pedido");
var _feedback = require("./feedback");
var _modo_envio = require("./modo_envio");
var _pedido = require("./pedido");
var _resettoken = require("./resettoken");
var _servicoCapaAcabamento = require("./servicoCapaAcabamento");
var _servicoCopiaTamanho = require("./servicoCopiaTamanho");
var _servico_pedido = require("./servico_pedido");
var _tipo_usuario = require("./tipo_usuario");
var _user_roles = require("./user_roles");
var _usuario = require("./usuario");

const config = require("../../config/").dbConfig;
const Sequelize = require("sequelize");

sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  dialectOptions: {
    useUTC: config.dialectOptions.useUTC, //for reading from database
    dateStrings: config.dialectOptions.dateStrings,
    typeCast: config.dialectOptions.typeCast,
  },
  timezone: config.timezone, //for writing to database
});

function initModels(sequelize) {
  var avaliacao_pedido = _avaliacao_pedido(sequelize, DataTypes);
  var centro_custos = _centro_custos(sequelize, DataTypes);
  var curso = _curso(sequelize, DataTypes);
  var departamento = _departamento(sequelize, DataTypes);
  var det_pedido = _det_pedido(sequelize, DataTypes);
  var feedback = _feedback(sequelize, DataTypes);
  var modo_envio = _modo_envio(sequelize, DataTypes);
  var pedido = _pedido(sequelize, DataTypes);
  var resettoken = _resettoken(sequelize, DataTypes);
  var servicoCapaAcabamento = _servicoCapaAcabamento(sequelize, DataTypes);
  var servicoCopiaTamanho = _servicoCopiaTamanho(sequelize, DataTypes);
  var servico_pedido = _servico_pedido(sequelize, DataTypes);
  var tipo_usuario = _tipo_usuario(sequelize, DataTypes);
  var user_roles = _user_roles(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);

  tipo_usuario.belongsToMany(usuario, { as: 'userId_usuarios', through: user_roles, foreignKey: "roleId", otherKey: "userId" });
  usuario.belongsToMany(tipo_usuario, { as: 'roles', through: user_roles, foreignKey: "userId", otherKey: "roleId" });
  feedback.belongsTo(avaliacao_pedido, { as: "avaliacao", foreignKey: "avaliacaoId"});
  avaliacao_pedido.hasMany(feedback, { as: "feedbacks", foreignKey: "avaliacaoId"});
  pedido.belongsTo(avaliacao_pedido, { as: "id_avaliacao_pedido_avaliacao_pedido", foreignKey: "id_avaliacao_pedido"});
  avaliacao_pedido.hasMany(pedido, { as: "pedidos", foreignKey: "id_avaliacao_pedido"});
  det_pedido.belongsTo(centro_custos, { as: "id_centro_custos_centro_custo", foreignKey: "id_centro_custos"});
  centro_custos.hasMany(det_pedido, { as: "det_pedidos", foreignKey: "id_centro_custos"});
  det_pedido.belongsTo(curso, { as: "id_curso_curso", foreignKey: "id_curso"});
  curso.hasMany(det_pedido, { as: "det_pedidos", foreignKey: "id_curso"});
  curso.belongsTo(departamento, { as: "id_depto_departamento", foreignKey: "id_depto"});
  departamento.hasMany(curso, { as: "cursos", foreignKey: "id_depto"});
  usuario.belongsTo(departamento, { as: "depto_departamento", foreignKey: "depto"});
  departamento.hasMany(usuario, { as: "usuarios", foreignKey: "depto"});
  pedido.belongsTo(modo_envio, { as: "id_modo_envio_modo_envio", foreignKey: "id_modo_envio"});
  modo_envio.hasMany(pedido, { as: "pedidos", foreignKey: "id_modo_envio"});
  det_pedido.belongsTo(pedido, { as: "id_pedido_pedido", foreignKey: "id_pedido"});
  pedido.hasMany(det_pedido, { as: "det_pedidos", foreignKey: "id_pedido"});
  feedback.belongsTo(pedido, { as: "pedido", foreignKey: "pedidoId"});
  pedido.hasMany(feedback, { as: "feedbacks", foreignKey: "pedidoId"});
  servico_pedido.belongsTo(pedido, { as: "pedido", foreignKey: "pedidoId"});
  pedido.hasMany(servico_pedido, { as: "servico_pedidos", foreignKey: "pedidoId"});
  servico_pedido.belongsTo(servicoCapaAcabamento, { as: "servicoCA_servicoCapaAcabamento", foreignKey: "servicoCA"});
  servicoCapaAcabamento.hasMany(servico_pedido, { as: "servico_pedidos", foreignKey: "servicoCA"});
  servico_pedido.belongsTo(servicoCopiaTamanho, { as: "servicoCT_servicoCopiaTamanho", foreignKey: "servicoCT"});
  servicoCopiaTamanho.hasMany(servico_pedido, { as: "servico_pedidos", foreignKey: "servicoCT"});
  user_roles.belongsTo(tipo_usuario, { as: "role", foreignKey: "roleId"});
  tipo_usuario.hasMany(user_roles, { as: "user_roles", foreignKey: "roleId"});
  feedback.belongsTo(usuario, { as: "user", foreignKey: "userId"});
  usuario.hasMany(feedback, { as: "feedbacks", foreignKey: "userId"});
  pedido.belongsTo(usuario, { as: "nif_usuario", foreignKey: "nif"});
  usuario.hasMany(pedido, { as: "pedidos", foreignKey: "nif"});
  user_roles.belongsTo(usuario, { as: "user", foreignKey: "userId"});
  usuario.hasMany(user_roles, { as: "user_roles", foreignKey: "userId"});

  return {
    avaliacao_pedido,
    centro_custos,
    curso,
    departamento,
    det_pedido,
    feedback,
    modo_envio,
    pedido,
    resettoken,
    servicoCapaAcabamento,
    servicoCopiaTamanho,
    servico_pedido,
    tipo_usuario,
    user_roles,
    usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
