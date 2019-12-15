const router = require('express').Router();
const Section = require('../models/sections-model');
const Tag = require('../models/tags-model');
const Note = require('../models/notes-model');

// добавление новой section
router.route('/add').post((req, res) => {
	const nameSection = req.body.nameSection;
	const userId = req.body.userId;

	const newSection = new Section({
		nameSection,
		userId
	});
	// console.log('string 14: ', newSection);

	newSection
		// { raw: true } - получение результата без метаданных
		.save({ raw: true })
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
	Section.findByPk(req.params.id).then(section => {
		if (!section) {
			return res.status(404).json({
				error,
				message: 'Section not found!'
			});
		}

		section.nameSection = req.body.nameSection;
		section.userId = req.body.userId;

		section
			// { raw: true } - получение результата без метаданных
			.save({ raw: true })
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
router.route('/remove/:id').post((req, res) => {
	// переносим notes в All section -> sectionId = 0
	Note.update({ sectionId: '0' }, { where: { sectionId: req.params.id } });

	// переносим tags в All section -> sectionId = 0
	Tag.update({ sectionId: '0' }, { where: { sectionId: req.params.id } });

	Section.destroy({ where: { id: req.params.id } })
		.then(section => {
			if (!section) {
				return res.status(405).json({
					success: false,
					massage: 'Section not found',
					error
				});
			}
			return res.status(200).json({
				success: true,
				data: { id: req.params.id },
				message: `This section was removed successful! 
			All notes of removed section have traversed to unsorted`
			});
		})
		.catch(error => {
			res.status(400).json({
				error,
				message: 'Section not deleted!'
			});
		});
});

module.exports = router;
