const Sequelize = require('sequelize');
const sequelize = require('../db_connect');

// Создание таблицы tags
const Tag = sequelize.define('tag', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	nameTag: {
		type: Sequelize.STRING,
		allowNull: false
	},
	sectionId: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

module.exports = Tag;
