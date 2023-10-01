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
      Elementos.hasMany(models.Matricula, {
        foreignKey: "estudante_id",
      });
    }
  }
  Elementos.init(
    {
      nome: DataTypes.STRING,
      ativo: DataTypes.BOOLEAN,
      email: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Elementos",
    }
  );
  return Elementos;
};
