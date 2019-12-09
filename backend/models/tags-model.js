const Sequelize = require('sequelize');
const sequelize = require('../db_connect');

const Note = require('../models/notes-model');

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
	}
});

// привязка внешнего ключа tagId для notes
Tag.hasMany(Note);

module.exports = Tag;
