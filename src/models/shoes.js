'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      shoes.hasMany(models.shoeVariants, { foreignKey: 'shoeId', as: 'variants' });
      shoes.hasMany(models.shoeImages, { 
        foreignKey: 'shoeId', 
        as: 'images'  // Ensure alias matches in `include` isnide the serach repository
      });
      shoes.hasMany(models.favourites, {
        foreignKey: 'shoeId',
        as: 'favourites'
      });
    }
  }
  shoes.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 255] // Ensures a reasonable length
      }
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    price:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0 // Prevents negative prices
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating:  {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
      min: 0,
      max: 5 // Ensures rating stays within range
    }
    },
  }, {
    sequelize,
    modelName: 'shoes',
  });
  return shoes;
};