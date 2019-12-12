const Sequelize = require('sequelize');
const sequelize = require('../db_connect');

// Создание таблицы sections
const Section = sequelize.define('section', {
	id: {
		type: Sequelize.UUID,
		// autoIncrement: true,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false
	},
	nameSection: {
		type: Sequelize.STRING,
		allowNull: false
	},
	createdAt: {
		type: Sequelize.DATE,
		allowNull: false
	},
	updatedAt: { type: Sequelize.DATE },
	deletedAt: { type: Sequelize.DATE }
});

module.exports = Section;
