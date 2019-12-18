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
const getHashPassUser = pass => {
	const passHashed = bcrypt.hash(pass, 8);
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

	if (!result)
		user = {
			typeMsg: 'error',
			message: 'Invalid login credentials'
		};
	else {
		user = result;

		const isPasswordMatch = await bcrypt.compare(pass, user.pass);
		if (!isPasswordMatch) {
			user = {
				typeMsg: 'error',
				message: 'Invalid password credentials'
			};
		}
	}
	return user;
};

// отправляем новый пароль на email user'a
const sendNewPassword = (login, pass) => {
	let mailOptions = {
		from: process.env.SERVICE_USER,
		to: login,
		subject: 'Reset your account password',
		html: `<h4><b>Resetting Password on ${process.env.SITE_NAME}</b></h4>
					<p>your temporary password - ${pass}</p>
					<p>--${process.env.SITE_NAME} Team</p>`
	};

	var transporter = nodemailer.createTransport({
		host: process.env.SERVICE_HOST,
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: process.env.SERVICE_USER,
			pass: process.env.SERVICE_PASS
		}
	});

	transporter.sendMail(mailOptions, function(error, info) {
		if (error) console.log(error);
		else console.log('Email sent: ' + info.response);
	});
};

// генератор случайного пароля
const getRundomPass = () => {
	var length = 8,
		charset =
			'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
		retVal = '';
	for (var i = 0, n = charset.length; i < length; ++i) {
		retVal += charset.charAt(Math.floor(Math.random() * n));
	}
	return retVal;
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

	// проверяем на валидность логин
	const isLoginEmail = validator.isEmail(user.login);
	// если логин валиден, проверяем его уникальность
	const isExistLogin = await User.findOne({
		where: { login: user.login }
	});
	// если логин валиден
	if (isLoginEmail) {
		// если логин уникальный и еще не существует
		if (!isExistLogin) {
			await user
				.save()
				.then(() => {
					const data = {
						user,
						typeMsg: 'success',
						message: 'NewUser was created successful!'
					};
					return res.status(200).json(data);
				})
				.catch(error => {
					return res.status(400).json({
						error,
						message: 'User not created!'
					});
				});
		}
		// если логин не уникальный и уже существует
		else {
			const data = {
				typeMsg: 'error',
				message: 'This Login is already busy. User not created!'
			};
			return res.status(201).json(data);
		}
	}
	// если логин не валиден
	else {
		const data = {
			typeMsg: 'error',
			message: 'Login is not email. User not created!'
		};
		return res.status(201).json(data);
	}
});

// Войти зарегистрированному пользователю
// И получение данных, если login и pass существуют
router.route('/enter').post(async (req, res) => {
	try {
		const { login, pass } = req.body;
		const user = await findByCredentials(login, pass);

		// если есть сообщения об ошибке
		if (user.typeMsg) {
			const data = {
				typeMsg: user.typeMsg,
				message: user.message
			};

			return res.status(201).send(data);
		}
		// если ошибок нет
		else {
			user.token = await generateAuthToken();
			// сохраняем token в БД
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
				notes,
				typeMsg: 'success',
				message: 'Welcome to CintaNotesWeb!'
			};

			return res.status(201).send(data);
		}
	} catch (error) {
		return res.status(400).send({
			error,
			message: 'Login is failed'
		});
	}
});

// обновление user (изменение пароля)
router.route('/update/:token').put(async (req, res) => {
	//console.log(req.body)
	const user = await User.findOne({ where: { token: req.params.token } });
	if (!user) {
		const data = {
			typeMsg: 'error',
			message: 'Token not found!'
		};
		return res.status(201).json(data);
	}

	let { inputNewPass, inputOldPass } = req.body;
	const isPasswordMatch = await bcrypt.compare(inputOldPass, user.pass);

	// Если старые пароли совпадают
	if (isPasswordMatch) {
		user.pass = await getHashPassUser(inputNewPass);
		user
			.save()
			.then(() => {
				const data = {
					typeMsg: 'success',
					message: 'Password was updated successful!'
				};
				return res.status(201).json(data);
			})
			.catch(error => {
				return res.status(400).json({
					error,
					typeMsg: 'error',
					message: 'User not updated!'
				});
			});
	}
	// Если старые пароли не совпадают
	else {
		const data = {
			typeMsg: 'error',
			message: 'Entered incorrect old Password'
		};
		return res.status(201).json(data);
	}
});

// Выход пользователя из приложения
router.route('/logout/:token').get(async (req, res) => {
	try {
		const user = await User.findOne({
			where: { token: req.params.token }
		});
		if (!user) {
			const data = {
				typeMsg: 'error',
				message: 'Token not found!'
			};
			return res.status(201).json(data);
		}
		user.token = '';
		// сохраняем token в БД
		await user.save();
		const data = {
			typeMsg: 'success',
			message: 'You logout success!'
		};
		return res.status(201).json(data);
	} catch (error) {
		res.status(500).send(error);
	}
});

// Восстановление пароля пользователя
router.route('/reset-pass').post(async (req, res) => {
	try {
		const { userLogin } = req.body;

		const user = await User.findOne({ where: { login: userLogin } });
		// если user не найден
		if (!user) {
			const data = {
				typeMsg: 'error',
				message: `Your email ${userLogin} not registered!`
			};
			return res.status(201).json(data);
		}
		// если user найден
		else {
			// генерация случайного пароля
			const newPass = getRundomPass();
			// хешируем пароль для БД
			user.pass = await getHashPassUser(newPass);
			// отправка пароля на user email (user.login)
			await sendNewPassword(user.login, newPass);
			// сохранение пароля в БД
			await user.save();
			const data = {
				typeMsg: 'success',
				message: `New Password sent on ${userLogin}, Check spam`
			};
			return res.status(201).json(data);
		}
	} catch (error) {
		const data = {
			error,
			typeMsg: 'error',
			message: 'Oops!'
		};
		return res.status(400).json(data);
	}
});

module.exports = router;
