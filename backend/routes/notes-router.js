const router = require('express').Router();
let Note = require('../models/notes-model');

// добавление нового note
router.route('/add').post((req, res) => {
	const newNote = new Note({
		header: req.body.header,
		text: req.body.text,
		remarks: req.body.remarks,
		link: req.body.link,
		userId: req.body.userId,
		sectionId: req.body.sectionId,
		tagId: req.body.tagId
	});
	//console.log('string 14: ', newNote)

	newNote
		.save()
		.then(() => {
			return res.status(200).json({
				success: true,
				data: newNote,
				message: 'New Note was created successful!'
			});
		})
		.catch(error => {
			return res.status(400).json({
				error,
				message: 'Note not created!'
			});
		});
});

// обновление note
router.route('/update/:id').put((req, res) => {
	//console.log(req.body)
	Note.findOne({ id: req.params._id }, (error, note) => {
		if (error) {
			return res.status(404).json({
				error,
				message: 'Note not found!'
			});
		}

		note.header = req.body.header;
		(note.text = req.body.text),
			(note.remarks = req.body.remarks),
			(note.link = req.body.link),
			(note.userId = req.body.userId);
		note.sectionId = req.body.sectionId;
		(note.tagId = req.body.tagId),
			note
				.save()
				.then(() => {
					return res.status(200).json({
						success: true,
						data: note,
						message: 'This note was updated successful!'
					});
				})
				.catch(error => {
					return res.status(400).json({
						error,
						message: 'Note not updated!'
					});
				});
	});
});

// удаление note
router.route('/remove/:id').delete((req, res) => {
	//console.log('req.params.idx', req.params._id)
	Note.findOneAndDelete({ id: req.params._id }, (error, note) => {
		//console.log('note', note)
		if (!note) {
			return res.status(405).json({
				success: false,
				massage: 'Note not found',
				error
			});
		}
		return res.status(200).json({
			success: true,
			data: note,
			message: 'This note was removed successful!'
		});
	}).catch(error => {
		res.status(400).json({
			error,
			message: 'Note not deleted!'
		});
	});
});

module.exports = router;
