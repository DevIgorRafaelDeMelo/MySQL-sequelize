"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Matricula extends Model {
    static associate(models) {
      Matricula.belongsTo(models.Elementos, {
        foreignKey: "estudante_id",
      });
      Matricula.belongsTo(models.Turmas, {
        foreignKey: "turma_id",
      });
    }
  }
  Matricula.init(
    {
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Matricula",
    }
  );
  return Matricula;
};
