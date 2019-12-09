const express = require('express');
const sequelize = require('./db_connect');

const sectionsRouter = require('./routes/sections-router');
const tagsRouter = require('./routes/tags-router');
const notesRouter = require('./routes/notes-router');
const usersRouter = require('./routes/users-router');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
	// Exprees will serve up production assets
	app.use(express.static('client/build'));
}

// Express serve up index.html file if it doesn't recognize route
// const path = require('path');
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });

app.use('/sections', sectionsRouter);
app.use('/tags', tagsRouter);
app.use('/notes', notesRouter);
app.use('/users', usersRouter);

// синхронизация с бд, после успешной синхронизации запускаем сервер
sequelize
	.sync({ force: false })
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is running on port: ${port}`);
		});
	})
	.catch(err => console.log(err));
