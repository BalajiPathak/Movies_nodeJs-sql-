const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Rental = sequelize.define('rental', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'customers',
            key: 'id'
        }
    },
    movieId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'movies',
            key: 'id'
        }
    },
    rentalDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

module.exports = Rental;