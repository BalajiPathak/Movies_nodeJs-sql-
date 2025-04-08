const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const MembershipType = sequelize.define('membershipType', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = MembershipType;