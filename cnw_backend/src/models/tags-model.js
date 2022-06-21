import { Sequelize } from 'sequelize';
import { dbConnect } from '../helpers';

// Создание таблицы tags
export const Tag = dbConnect.define('tag', {
	id: {
		type: Sequelize.UUID,
		// autoIncrement: true,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
	},
	nameTag: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	sectionId: {
		type: Sequelize.UUID,
		allowNull: false,
	},
});
