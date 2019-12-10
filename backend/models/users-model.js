const Sequelize = require('sequelize');
const sequelize = require('../db_connect');

const Section = require('../models/sections-model');
const Tag = require('../models/tags-model');
const Note = require('../models/notes-model');

// Создание таблицы users
const User = sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	login: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	pass: {
		type: Sequelize.STRING,
		allowNull: false
	},
	status: {
		type: Sequelize.ENUM,
		values: ['user', 'admin'],
		allowNull: false
	},
	lang: {
		type: Sequelize.ENUM,
		values: ['ru', 'en'],
		allowNull: false
	},
	theme: {
		type: Sequelize.ENUM,
		values: ['night', 'light'],
		allowNull: false
	}
});

// привязка внешнего ключа userId для sections, tags, notes
User.hasMany(Tag);
User.hasMany(Note);
User.hasMany(Section);

module.exports = User;
