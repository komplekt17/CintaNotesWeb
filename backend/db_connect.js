const Sequelize = require('sequelize');

require('dotenv').config();

// определяем объект Sequelize
const sequelize = new Sequelize(
	process.env.NAME_DATABASE,
	process.env.USER,
	process.env.PASS,
	{
		dialect: 'mysql',
		host: process.env.LOCAL_URI
	}
);

module.exports = sequelize;
