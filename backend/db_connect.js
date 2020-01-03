const Sequelize = require('sequelize');

const yenv = require('yenv');
const env = yenv('env.yaml', { env: 'production' });

// определяем объект Sequelize
const sequelize = new Sequelize(
	env.DATABASE_NAME,
	env.DATABASE_USER,
	env.DATABASE_PASS,
	{
		host: env.HOSTING_URI,
		port: env.DATABASE_PORT,
		dialect: env.DATABASE_DIALECT,
		logging: false
	}
);

module.exports = sequelize;
