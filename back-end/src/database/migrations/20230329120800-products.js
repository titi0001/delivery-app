'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
await queryInterface.createTable('products', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(100),
    unique: true, 
    allowNull: false,
  },
  price:{
    type: Sequelize.DECIMAL(4,2),
    allowNull: false
  },
  urlImage: {
    type: Sequelize.STRING(200),
    allowNull: false,
    default: '',
    field:'url_image'
  },
})
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('products');
  }
};
