const {Op} = require('sequelize');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
	console.log(req.body);
	const {username, email, password} = req.body;
	console.log(username, email, password, req.body);
	try {
		const existingUser = await User.findOne({
			where: {
				[Op.or]: [{username}, {email}],
			},
		});

		if (existingUser) {
			return res.status(409).json({message: 'Username or email is already registered'});
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await User.create({username, email, password: hashedPassword});

		return res.status(201).json({message: 'User registered successfully', user: newUser});
	} catch (error) {
		console.error('Error registering user:', error);
		return res.status(500).json({message: 'Registration failed.'});
	}
};

exports.login = async (req, res) => {
	const {username, password} = req.body;

	try {
		const user = await User.findOne({where: {username}});

		if (!user) {
			return res.status(404).json({message: 'User not found'});
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return res.status(401).json({message: 'Invalid username or password'});
		}

		return res.status(200).json({message: 'Login successful', user});
	} catch (error) {
		console.error('Error logging in:', error);
		return res.status(500).json({message: 'Login failed. Please try again later.'});
	}
};

exports.logout = (req, res) => {
	req.session.destroy(error => {
		if (error) {
			console.error('Error logging out:', error);
			return res.status(500).json({message: 'Logout failed. Please try again later.'});
		}

		return res.status(200).json({message: 'Logout successful'});
	});
};

exports.getUser = async (req, res) => {
	const userId = req.params.id;

	try {
		const user = await User.findByPk(userId);

		if (!user) {
			return res.status(404).json({message: 'User not found'});
		}

		return res.status(200).json({user});
	} catch (error) {
		console.error('Error retrieving user:', error);
		return res.status(500).json({message: 'Failed to retrieve user. Please try again later.'});
	}
};

