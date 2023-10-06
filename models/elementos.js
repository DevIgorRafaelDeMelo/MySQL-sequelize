"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Elementos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Elementos.hasMany(models.Turmas, {
        foreignKey: "docente_id",
      });
      Elementos.hasMany(models.Matriculas, {
        foreignKey: "estudante_id",
        scope: { status: "cancelado" },
        as: "AulasMatriculadas",
      });
    }
  }
  Elementos.init(
    {
      nome: {
        type: DataTypes.STRING,
        validate: {
          funcaovalidadora: function (dado) {
            if (dado.length < 3) {
              throw new Error("O CAMPO DEVE TER MAIS Q 3 CARACTERES");
            }
          },
        },
      },
      ativo: DataTypes.BOOLEAN,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "dado do tipo e-mails",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      paranoid: true,
      sequelize,
      modelName: "Elementos",
      defaultScope: {
        where: {
          ativo: true,
        },
      },
      scopes: {
        ativo: {
          where: { ativo: false },
        },
      },
    }
  );
  return Elementos;
};
