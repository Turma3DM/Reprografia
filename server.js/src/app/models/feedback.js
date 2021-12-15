const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('feedback', {
    feedbackId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'nif'
      }
    },
    pedidoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pedido',
        key: 'id_pedido'
      }
    },
    avaliacaoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'avaliacao_pedido',
        key: 'id_avaliacao_pedido'
      }
    },
    avaliacao_obs: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'feedback',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "feedBackId" },
        ]
      },
      {
        name: "userId",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "pedidoId",
        using: "BTREE",
        fields: [
          { name: "pedidoId" },
        ]
      },
      {
        name: "avaliacaoId",
        using: "BTREE",
        fields: [
          { name: "avaliacaoId" },
        ]
      },
    ]
  });
};
