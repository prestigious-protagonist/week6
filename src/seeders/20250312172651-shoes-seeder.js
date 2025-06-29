'use strict';
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * */
     await queryInterface.bulkInsert('shoes', [ {
        id: uuidv4(),
        name: 'Nike Air Max',
        brand: 'Nike',
        category: 'Sneakers',
        price: 150,
        description: 'Comfortable running shoes with Air cushioning.',
        rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Adidas Ultraboost',
        brand: 'Adidas',
        category: 'Running Shoes',
        price: 180,
        description: 'High-performance running shoes with Boost technology.',
        rating: 4.7,
        createdAt: new Date(),
        updatedAt: new Date()
    }], {});
    

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
