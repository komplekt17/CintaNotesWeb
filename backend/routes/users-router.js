const router = require('express').Router();
let User = require('../models/users-model');

// добавление новой user
router.route('/create').post((req, res) => {
	const newUser = new User({
		login: req.body.login,
		pass: req.body.pass,
		status: req.body.status,
		lang: req.body.lang,
		theme: req.body.theme
	});
	console.log('string 14: ', newUser);

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

module.exports = router;
