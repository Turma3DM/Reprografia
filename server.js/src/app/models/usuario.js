const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    nif: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    senha: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    telefone: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    depto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'departamento',
        key: 'id_depto'
      }
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: "unique_email"
    },
    cfp: {
      type: DataTypes.STRING(7),
      allowNull: false
    },
    imagem: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ativado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    primeiro_acesso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'usuario',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nif" },
        ]
      },
      {
        name: "unique_email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "depto",
        using: "BTREE",
        fields: [
          { name: "depto" },
        ]
      },
    ]
  });
};
