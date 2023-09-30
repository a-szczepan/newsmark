const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');

const sequelize = new Sequelize(
	'newsmark',
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		dialect: 'mysql',
		dialectOptions: {
			ssl: {
			  rejectUnauthorized: true,
			},
		},
	},
);

sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.');
 }).catch((error) => {
	console.error('Unable to connect db: ', error);
 });

sequelize.sync({ force: false }).then(() => {console.log('Sync done')})


module.exports = sequelize;
