'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shoeImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shoeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references:{
          model: 'shoes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      imageUrl: {
        type: Sequelize.JSON,
        defaultValue: []
      },
      variantsId: {
        type: Sequelize.UUID,  // Foreign key referencing shoeVariants
        allowNull: false,
        references: {
            model: "shoeVariants",  // Must match the actual table name in DB
            key: "id"
        },
        onDelete: "CASCADE"
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('shoeImages');
  }
};