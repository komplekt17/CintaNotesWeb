const Sequelize = require('sequelize');
const sequelize = require('../db_connect');

// Создание таблицы tags
const Tag = sequelize.define('tag', {
	id: {
		type: Sequelize.UUID,
		// autoIncrement: true,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false
	},
	nameTag: {
		type: Sequelize.STRING,
		allowNull: false
	},
	sectionId: {
		type: Sequelize.UUID,
		allowNull: false
	}
});

module.exports = Tag;
