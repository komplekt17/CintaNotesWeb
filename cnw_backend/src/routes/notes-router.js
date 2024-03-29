import { Router } from 'express';
import { Note } from '../models';

export const notesRouter = Router();

// добавление нового note
notesRouter.post('/add', async (req, res) => {
	const newNote = new Note({
		header: req.body.header,
		text: req.body.text,
		remarks: req.body.remarks,
		link: req.body.link,
		userId: req.body.userId,
		sectionId: req.body.sectionId,
		tagId: req.body.tagId,
	});
	//console.log('string 14: ', newNote)

	await newNote
		// { raw: true } - получение результата без метаданных
		.save({ raw: true })
		.then(() => {
			return res.status(200).json({
				success: true,
				data: newNote,
				message: 'New Note was created successful!',
			});
		})
		.catch((error) => {
			return res.status(400).json({
				error,
				message: 'Note not created!',
			});
		});
});

// обновление note
notesRouter.put('/update/:id', (req, res) => {
	Note.findOne({ where: { id: req.params.id } }).then((note, error) => {
		if (!note) {
			return res.status(404).json({
				message: 'Note not found!',
				error,
			});
		}

		note.header = req.body.header;
		note.text = req.body.text;
		note.remarks = req.body.remarks;
		note.link = req.body.link;
		note.userId = req.body.userId;
		note.sectionId = req.body.sectionId;
		note.tagId = req.body.tagId;

		note
			// { raw: true } - получение результата без метаданных
			.save({ raw: true })
			.then(() => {
				return res.status(200).json({
					success: true,
					data: note,
					message: 'This note was updated successful!',
				});
			})
			.catch((error) => {
				return res.status(400).json({
					error,
					message: 'Note not updated!',
				});
			});
	});
});

// удаление note
notesRouter.post('/remove/:id', (req, res) => {
	//console.log('req.params.idx', req.params._id)
	Note.destroy({ where: { id: req.params.id } })
		.then((note) => {
			//console.log('note', note)
			if (!note) {
				return res.status(405).json({
					success: false,
					massage: 'Note not found',
					error,
				});
			}
			return res.status(200).json({
				success: true,
				data: { id: req.params.id },
				message: 'This note was removed successful!',
			});
		})
		.catch((error) => {
			res.status(400).json({
				error,
				message: 'Note not deleted!',
			});
		});
});
