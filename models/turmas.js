"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Turmas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Turmas.hasMany(models.Matricula, {
        foreignKey: "turma_id",
      });
      Turmas.belongsTo(models.Elementos, {
        foreignKey: "docente_id",
      });
      Turmas.belongsTo(models.niveis, {
        foreignKey: "nivel_id",
      });
    }
  }
  Turmas.init(
    {
      data_inicio: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Turmas",
    }
  );
  return Turmas;
};
