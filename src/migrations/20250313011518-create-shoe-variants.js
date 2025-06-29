'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shoeVariants', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID, 
        defaultValue: Sequelize.UUIDV4
      },
      shoeId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'shoes',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
      
      color: {
        type: Sequelize.STRING,
        allowNull: false
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
    // await queryInterface.addConstraint('shoeVariants', {
    //   fields: ['shoeId', 'size', 'color'],
    //   type: 'unique',
    //   name: 'unique_shoe_variants' 
    // });
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.removeConstraint('shoeVariants', 'shoevariants_ibfk_1');
    
    //await queryInterface.removeConstraint('shoeVariants', 'unique_shoe_variants');
    await queryInterface.dropTable('shoeVariants');
  }
};