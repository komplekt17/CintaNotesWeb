import { Sequelize } from 'sequelize';
import {
	DATABASE_NAME,
	DATABASE_USER,
	DATABASE_PASS,
	HOSTING_URI,
	DATABASE_PORT,
	DATABASE_DIALECT,
} from '../constants';

// определяем объект Sequelize
export const dbConnect = new Sequelize(
	DATABASE_NAME,
	DATABASE_USER,
	DATABASE_PASS,
	{
		host: HOSTING_URI,
		port: DATABASE_PORT,
		dialect: DATABASE_DIALECT,
		logging: false,
	}
);
