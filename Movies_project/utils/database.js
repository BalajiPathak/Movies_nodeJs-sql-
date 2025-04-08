const Sequelize = require('sequelize');

const sequelize = new Sequelize('vidly', 'root', 'Balaji123', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306
});

module.exports = sequelize;
