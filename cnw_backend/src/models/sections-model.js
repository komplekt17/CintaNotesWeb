import { Sequelize } from 'sequelize';
import { dbConnect } from '../helpers';

// Создание таблицы sections
export const Section = dbConnect.define('section', {
	id: {
		type: Sequelize.UUID,
		// autoIncrement: true,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
	},
	nameSection: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	createdAt: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	updatedAt: { type: Sequelize.DATE },
	deletedAt: { type: Sequelize.DATE },
});
