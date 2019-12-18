const router = require('express').Router();
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const User = require('../models/users-model');
const Section = require('../models/sections-model');
const Tag = require('../models/tags-model');
const Note = require('../models/notes-model');

require('dotenv').config();

// Хешируем пароль
const getHashPassUser = async pass => {
	const passHashed = await bcrypt.hash(pass, 8);
	return passHashed;
};

// Генерируем авторизационный токен для пользователя
const generateAuthToken = async () => {
	const user = this;
	const token = await jwt.sign({ id: user.id }, process.env.JWT_KEY);

	return token;
};

// Search for a user by login and pass.
const findByCredentials = async (userLogin, pass) => {
	let user = {};
	const result = await User.findOne({ where: { login: userLogin } });

	if (!result) user = { error: 'Invalid login credentials' };
	else {
		user = result;

		const isPasswordMatch = await bcrypt.compare(pass, user.pass);
		if (!isPasswordMatch) {
			user = { error: 'Invalid password credentials' };
		}
	}
	return user;
};

// добавление нового user
router.route('/create').post(async (req, res) => {
	const user = new User({
		login: req.body.login,
		pass: await getHashPassUser(req.body.pass),
		status: req.body.status,
		lang: req.body.lang,
		theme: req.body.theme,
		token: await generateAuthToken()
	});

	const isLoginEmail = validator.isEmail(req.body.login);
	console.log(isLoginEmail);
	if (isLoginEmail) {
		await user
			.save()
			.then(() => {
				return res.status(200).json({
					typeMsg: 'success',
					data: user,
					message: 'NewUser was created successful!'
				});
			})
			.catch(error => {
				return res.status(400).json({
					error,
					message: 'User not created!'
				});
			});
	} else {
		return res.status(201).json({
			typeMsg: 'error',
			message: 'Login is not email. User not created!'
		});
	}
});

// Войти зарегистрированному пользователю
// И получение данных, если login и pass существуют
router.route('/enter').post(async (req, res) => {
	//Login a registered user
	try {
		const { login, pass } = req.body;
		const user = await findByCredentials(login, pass);
		const { error } = user;
		if (error) {
			const data = { error };
			return res.status(201).send(data);
		} else {
			user.token = await generateAuthToken();
			await user.save();

			const sections = await Section.findAll({
				where: { userId: user.id }
			});
			const tags = await Tag.findAll({ where: { userId: user.id } });
			const notes = await Note.findAll({ where: { userId: user.id } });

			const data = {
				user,
				sections,
				tags,
				notes
			};
			// console.log('data', data);

			return res.status(201).send(data);
		}
	} catch (error) {
		return res.status(400).send({
			error,
			message: 'Login is failed'
		});
	}
});

module.exports = router;
