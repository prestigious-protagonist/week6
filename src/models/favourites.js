'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favourites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      favourites.belongsTo(models.shoes, {
        foreignKey: 'shoeId',
        as: 'shoeInfo'
      });
    }
  }
  favourites.init({
    shoeId: {
      type:DataTypes.UUID,
      allowNull: false,
      references:{
        model: "shoes",
        key: "id"
      }
    },
    userId: {
      type:DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'favourites',
    indexes: [
      {
        unique: true,
        fields: ['shoeId', 'userId']
      }
    ]
  });
  return favourites;
};