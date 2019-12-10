const Sequelize = require('sequelize');
const sequelize = require('../db_connect');

// Создание таблицы notes
const Note = sequelize.define('note', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	header: {
		type: Sequelize.STRING,
		allowNull: true
	},
	text: {
		type: Sequelize.TEXT,
		allowNull: true
	},
	remarks: {
		type: Sequelize.STRING,
		allowNull: true
	},
	link: {
		type: Sequelize.STRING,
		allowNull: true
	}
});

module.exports = Note;
