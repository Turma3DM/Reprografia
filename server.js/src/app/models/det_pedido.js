const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('det_pedido', {
    id_det_pedido: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pedido',
        key: 'id_pedido'
      }
    },
    id_centro_custos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'centro_custos',
        key: 'id_centro_custos'
      }
    },
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'curso',
        key: 'id_curso'
      }
    },
    observacoes: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    num_copias: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    num_paginas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    anexo_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    anexo_path: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sub_total_copias: {
      type: DataTypes.DECIMAL(10,5),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'det_pedido',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_det_pedido" },
        ]
      },
      {
        name: "id_pedido",
        using: "BTREE",
        fields: [
          { name: "id_pedido" },
        ]
      },
      {
        name: "id_centro_custos",
        using: "BTREE",
        fields: [
          { name: "id_centro_custos" },
        ]
      },
      {
        name: "id_curso",
        using: "BTREE",
        fields: [
          { name: "id_curso" },
        ]
      },
    ]
  });
};
