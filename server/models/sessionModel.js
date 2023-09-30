const {DataTypes} = require('sequelize');
const sequelize = require('../database/db');
const User = require('./userModel');

const Session = sequelize.define('Session', {
    id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
    valid: {
      type: DataTypes.BOOLEAN,
    },
    userAgent: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: true,
  });

  Session.hasOne(User); 