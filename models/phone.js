'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Phone.init(
    {
      model: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 100],
        },
      },

      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      yearOfManufacture: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: 1900,
            msg: 'Year of manufacture must be greater than 1900',
          },
          isBefore: new Date().toISOString(),
        },
      },

      ramSize: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isIn: {
            args: [['2GB', '4GB', '6GB', '8GB', '16GB', '32GB', '64GB']],
            msg: 'RAM size must be one of the predefined options',
          },
        },
      },
      processor: DataTypes.STRING,
      screenSize: DataTypes.STRING,
      hasNFC: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Phone',
    }
  );
  return Phone;
};
