'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shoeImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      shoeImages.belongsTo(models.shoes, { 
        foreignKey: 'shoeId', 
        as: 'shoe'  // Optional: Alias for reverse lookup
      });

      shoeImages.belongsTo(models.shoeVariants, { 
        foreignKey: 'variantsId',  // Correct foreign key
        as: 'variant'  // Unique alias to avoid conflicts
      });
      
    }
  }
  shoeImages.init({
    shoeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'shoes',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    imageUrl: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: []
    },
    variantsId: {
      type: DataTypes.UUID,  // Foreign key referencing shoeVariants
      allowNull: false,
      references: {
          model: "shoeVariants",  // Must match the actual table name in DB
          key: "id"
      },
      onDelete: "CASCADE"
  }
  }, {
    sequelize,
    modelName: 'shoeImages',
  });
  return shoeImages;
};