const router = require('express').Router();
let Tag = require('../models/tags-model');

// добавление нового tag
router.route('/add').post((req, res) => {
	const newTag = new Tag({
		nameTag: req.body.nameTag,
		userId: req.body.userId,
		sectionId: req.body.sectionId
	});
	//console.log('string 14: ', newTag)

	newTag
		.save()
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
	//console.log(req.body)
	Tag.findOne({ id: req.params._id }, (error, tag) => {
		if (error) {
			return res.status(404).json({
				error,
				message: 'Tag not found!'
			});
		}

		tag.nameTag = req.body.nameTag;
		tag.userId = req.body.userId;
		tag.sectionId = req.body.sectionId;

		tag
			.save()
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
