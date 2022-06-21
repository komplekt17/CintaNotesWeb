import { Sequelize } from 'sequelize';

import { dbConnect } from '../helpers';
import { Section, Tag, Note } from '../models';

// Создание таблицы users
export const User = dbConnect.define('user', {
	id: {
		type: Sequelize.UUID,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
	},
	login: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},
	pass: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	status: {
		type: Sequelize.ENUM,
		values: ['user', 'admin'],
		allowNull: false,
	},
	lang: {
		type: Sequelize.ENUM,
		values: ['ru', 'en'],
		allowNull: false,
	},
	theme: {
		type: Sequelize.ENUM,
		values: ['night', 'light'],
		allowNull: false,
	},
	token: {
		type: Sequelize.STRING,
		allowNull: true,
	},
});

// привязка внешнего ключа userId для sections, tags, notes
User.hasMany(Tag);
User.hasMany(Note);
User.hasMany(Section);
