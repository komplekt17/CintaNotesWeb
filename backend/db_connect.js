const Sequelize = require('sequelize');

require('dotenv').config();

// определяем объект Sequelize
const sequelize = new Sequelize(
	process.env.DATABASE_NAME,
	process.env.USER,
	process.env.PASS,
	{
		host: process.env.LOCAL_URI,
		// host: process.env.HOSTING_URI,
		port: process.env.DATABASE_PORT,
		dialect: process.env.DATABASE_DIALECT
	}
);

module.exports = sequelize;
