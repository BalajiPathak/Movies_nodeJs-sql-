const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Customer = sequelize.define('customer', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dateOfBirth: {
    type: Sequelize.DATE, 
    allowNull: false
  },
  isSubscribedToNewsletter: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  membershipTypeId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'membershipTypes',
      key: 'id'
    }
  }
});

module.exports = Customer;