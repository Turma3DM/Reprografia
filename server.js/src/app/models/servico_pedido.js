const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('servico_pedido', {
    pedidoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'pedido',
        key: 'id_pedido'
      }
    },
    servicoCT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'servicoCopiaTamanho',
        key: 'id_servico'
      }
    },
    servicoCA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'servicoCapaAcabamento',
        key: 'id_servico'
      }
    }
  }, {
    sequelize,
    tableName: 'servico_pedido',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pedidoId" },
          { name: "servicoCT" },
          { name: "servicoCA" },
        ]
      },
      {
        name: "servico_pedido_servicoCT_servicoCA_pedidoId_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pedidoId" },
          { name: "servicoCT" },
          { name: "servicoCA" },
        ]
      },
      {
        name: "servicoCT",
        using: "BTREE",
        fields: [
          { name: "servicoCT" },
        ]
      },
      {
        name: "servicoCA",
        using: "BTREE",
        fields: [
          { name: "servicoCA" },
        ]
      },
    ]
  });
};
