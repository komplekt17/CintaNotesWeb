const router = require('express').Router();
let Tag = require('../models/tags-model');
let Note = require('../models/notes-model');

// добавление нового tag
router.route('/add').post((req, res) => {
	const newTag = new Tag({
		nameTag: req.body.nameTag,
		userId: req.body.userId,
		sectionId: req.body.sectionId
	});
	//console.log('string 14: ', newTag)

	newTag
		// { raw: true } - получение результата без метаданных
		.save({ raw: true })
		.then(() => {
			return res.status(200).json({
				success: true,
				data: newTag,
				message: 'New Tag was created successful!'
			});
		})
		.catch(error => {
			return res.status(400).json({
				error,
				message: 'Tag not created!'
			});
		});
});

// обновление tag
router.route('/update/:id').put((req, res) => {
	Tag.findOne({ where: { id: req.params.id } }).then(tag => {
		if (!tag) {
			return res.status(404).json({
				message: 'Tag not found!'
			});
		}

		// переносим note в другую section
		// вместе с родительским tag
		Note.update(
			{ sectionId: req.body.sectionId },
			{ where: { tagId: req.params.id } }
		);

		tag.nameTag = req.body.nameTag;
		tag.userId = req.body.userId;
		tag.sectionId = req.body.sectionId;

		tag
			// { raw: true } - получение результата без метаданных
			.save({ raw: true })
			.then(() => {
				return res.status(200).json({
					success: true,
					data: tag,
					message: 'This tag was updated successful!'
				});
			})
			.catch(error => {
				return res.status(400).json({
					error,
					message: 'Tag not updated!'
				});
			});
	});
});

// удаление tag
router.route('/remove/:id').delete((req, res) => {
	//console.log('req.params.idx', req.params._id)
	Tag.findOneAndDelete({ id: req.params._id }, (error, tag) => {
		//console.log('tag', tag)
		if (!tag) {
			return res.status(405).json({
				success: false,
				massage: 'Tag not found',
				error
			});
		}
		return res.status(200).json({
			success: true,
			data: tag,
			message: 'This tag was removed successful!'
		});
	}).catch(error => {
		res.status(400).json({
			error,
			message: 'Tag not deleted!'
		});
	});
});

module.exports = router;
