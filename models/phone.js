'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Phone.init({
    model: DataTypes.STRING,
    brand: DataTypes.STRING,
    yearOfManufacture: DataTypes.INTEGER,
    ramSize: DataTypes.STRING,
    processor: DataTypes.STRING,
    screenSize: DataTypes.STRING,
    hasNFC: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Phone',
  });
  return Phone;
};