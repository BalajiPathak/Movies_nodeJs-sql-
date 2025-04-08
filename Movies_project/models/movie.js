const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Movie = sequelize.define('movie', {
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
  genreId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'genres',
      key: 'id'
    }
  }
});

module.exports = Movie;