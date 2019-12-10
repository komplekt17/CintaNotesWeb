const router = require('express').Router();
let Section = require('../models/sections-model');

// добавление новой section
router.route('/add').post((req, res) => {
	const nameSection = req.body.nameSection;
	const userId = req.body.userId;

	const newSection = new Section({
		nameSection,
		userId
	});
	console.log('string 14: ', newSection);

	newSection
		.save()
		.then(() => {
			return res.status(200).json({
				success: true,
				data: newSection,
				message: 'New Section was created successful!'
			});
		})
		.catch(error => {
			return res.status(400).json({
				error,
				message: 'Section not created!'
			});
		});
});

// обновление section
router.route('/update/:id').put((req, res) => {
	//console.log(req.body)
	Section.findOne({ id: req.params._id }, (error, section) => {
		if (error) {
			return res.status(404).json({
				error,
				message: 'Section not found!'
			});
		}

		section.nameSection = req.body.nameSection;
		section.userId = req.body.userId;

		section
			.save()
			.then(() => {
				return res.status(200).json({
					success: true,
					data: section,
					message: 'This section was updated successful!'
				});
			})
			.catch(error => {
				return res.status(400).json({
					error,
					message: 'Section not updated!'
				});
			});
	});
});

// удаление section
router.route('/remove/:id').delete((req, res) => {
	//console.log('req.params.idx', req.params.id)
	Section.findOneAndDelete({ id: req.params._id }, (error, section) => {
		//console.log('section', section)
		if (!section) {
			return res.status(405).json({
				success: false,
				massage: 'Section not found',
				error
			});
		}
		return res.status(200).json({
			success: true,
			data: section,
			message: 'This section was removed successful!'
		});
	}).catch(error => {
		res.status(400).json({
			error,
			message: 'Section not deleted!'
		});
	});
});

module.exports = router;
