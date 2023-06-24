const express = require('express');
const user = require('../controllers/userController');

exports.getPaths = () => {
	const router = express.Router();

	router.post('/api/register', user.register);
	router.post('/api/login', user.login);
	router.post('/api/logout', user.logout);
	router.get('/api/user/:id', user.getUser);

	return router;
};
