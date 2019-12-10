const Sequelize = require('sequelize');
const sequelize = require('../db_connect');

const Tag = require('../models/tags-model');
const Note = require('../models/notes-model');

// Создание таблицы sections
const Section = sequelize.define('section', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
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

// привязка внешнего ключа sectionId для tags, notes
Section.hasMany(Tag);
Section.hasMany(Note);

module.exports = Section;
