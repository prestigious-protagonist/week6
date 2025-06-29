'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sizes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      sizes.belongsTo(models.shoeVariants, { foreignKey: 'variantsId', as: 'variant' });
      
    }
  }
  sizes.init({
    variantsId: {
      type : DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'shoeVariants',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    size: {
      type: DataTypes.ENUM,
      values: ['7', '8', '9', '10', '11'], // Values must be strings
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'sizes',
  });
  return sizes;
};