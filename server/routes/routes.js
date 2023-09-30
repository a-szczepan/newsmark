const express = require('express');
const user = require('../controllers/userController');
const session = require('../controllers/sessionConntroller');

exports.getPaths = () => {
	const router = express.Router();

	router.post('/api/register', user.registerWithPassword);
	router.post('/api/login', user.login);
	router.post('/api/logout', user.logout);
	router.get('/api/user/:id', user.getUserById);
	
	router.get('/api/sessions/oauth/google', session.googleOAuthHandler);

	return router;
};
