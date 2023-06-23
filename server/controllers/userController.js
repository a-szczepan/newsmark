const {User} = require('../models/userModel');

exports.register = (req, res) => {
};

exports.login = (req, res) => {};

exports.logout = (req, res) => {};

exports.getUser = (req, res) => {
	console.log(User.firstName);
};

