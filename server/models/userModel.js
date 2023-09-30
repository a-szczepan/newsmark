const {DataTypes} = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define('User', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true,
		},
	},
	password: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	googleId: {
		type: DataTypes.STRING,
		allowNull: true
	}
}, {
	timestamps: true,
});

User.associate = models => {
	User.hasMany(models.Bookmark, {
		foreignKey: 'userId',
		onDelete: 'CASCADE',
	});
	User.hasMany(models.Annotation, {
		foreignKey: 'userId',
		onDelete: 'CASCADE',
	});
};

module.exports = User;
