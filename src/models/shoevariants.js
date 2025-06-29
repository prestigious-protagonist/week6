'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shoeVariants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      shoeVariants.belongsTo(models.shoes, { foreignKey: 'shoeId', as: 'shoe' });
      shoeVariants.hasMany(models.sizes, {foreignKey:'variantsId', as :'sizes' });
      shoeVariants.hasMany(models.shoeImages, { foreignKey: 'variantsId', as: 'images' });

    }
  }
  shoeVariants.init({
    
    shoeId: {
      type: DataTypes.UUID,
      references:{
        model: 'shoes',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    
  }, {
    sequelize,
    modelName: 'shoeVariants',
    // indexes:[{
    //   unique: true,
    //   fields:['shoeId','color','size'],
    //   name: 'unique_shoe_variants'
      
    // }]
  });
  return shoeVariants;
};