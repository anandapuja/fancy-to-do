'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const email = ['email']
    return queryInterface.addConstraint('Users', ['email'], {
      type: 'unique',
      name: 'emailUnique'
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Users', 'emailUnique');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
