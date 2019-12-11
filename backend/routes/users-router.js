const router = require('express').Router();
const User = require('../models/users-model');
const Section = require('../models/sections-model');
const Tag = require('../models/tags-model');
const Note = require('../models/notes-model');

// добавление нового user
router.route('/create').post((req, res) => {
	const newUser = new User({
		login: req.body.login,
		pass: req.body.pass,
		status: req.body.status,
		lang: req.body.lang,
		theme: req.body.theme
	});
	// console.log('string 14: ', newUser);

	newUser
		.save()
		.then(() => {
			return res.status(200).json({
				success: true,
				data: newUser,
				message: 'NewUser was created successful!'
			});
		})
		.catch(error => {
			return res.status(400).json({
				error,
				message: 'User not created!'
			});
		});
});

// Войти зарегистрированному пользователю
// И получение данных, если login и pass существуют
router.route('/enter').post(async (req, res) => {
	// Search for a user by login and pass.
	// Поиск пользователя по электронной почте и паролю.
	const findByCredentials = async (login, pass) => {
		let user = {};
		// { raw: true } - получение результата без метаданных
		const result = await User.findOne({ raw: true }, { where: { login } });

		if (!result) user = { error: 'Invalid login credentials' };
		else {
			user = result;

			// const isPasswordMatch = await bcrypt.compare(pass, user.pass)
			const isPasswordMatch = pass === user.pass;
			if (!isPasswordMatch) {
				user = { error: 'Invalid password credentials' };
			}
		}
		return user;
	};

	//Login a registered user
	try {
		const { login, pass } = req.body;
		const user = await findByCredentials(login, pass);
		const { error } = user;
		if (error) {
			const data = { error };
			return res.status(201).send(data);
		} else {
			// const token = await user.generateAuthToken();
			const sections = await Section.findAll(
				// { raw: true } - получение результата без метаданных
				{ raw: true },
				{ where: { userId: user.id } }
			);
			const tags = await Tag.findAll(
				{ raw: true },
				{ where: { userId: user.id } }
			);
			const notes = await Note.findAll(
				{ raw: true },
				{ where: { userId: user.id } }
			);

			const data = {
				user,
				// token,
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
