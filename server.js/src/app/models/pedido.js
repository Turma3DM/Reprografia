const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pedido', {
    id_pedido: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    titulo_pedido: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    nif: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'nif'
      }
    },
    id_modo_envio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'modo_envio',
        key: 'id_modo_envio'
      }
    },
    realizado_qtdade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    avaliado_qtdade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    custo_total: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    id_avaliacao_pedido: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'avaliacao_pedido',
        key: 'id_avaliacao_pedido'
      }
    }
  }, {
    sequelize,
    tableName: 'pedido',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_pedido" },
        ]
      },
      {
        name: "nif",
        using: "BTREE",
        fields: [
          { name: "nif" },
        ]
      },
      {
        name: "id_modo_envio",
        using: "BTREE",
        fields: [
          { name: "id_modo_envio" },
        ]
      },
      {
        name: "id_avaliacao_pedido",
        using: "BTREE",
        fields: [
          { name: "id_avaliacao_pedido" },
        ]
      },
    ]
  });
};