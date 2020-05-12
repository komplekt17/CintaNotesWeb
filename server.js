const express = require('express');
const cors = require('cors');
const sequelize = require('./db_connect');

const sectionsRouter = require('./routes/sections-router');
const tagsRouter = require('./routes/tags-router');
const notesRouter = require('./routes/notes-router');
const usersRouter = require('./routes/users-router');

const yenv = require('yenv');
const env = yenv('env.yaml', { env: 'development' });

const app = express();
const port = env.NODE_PORT;

app.use(cors());
app.use(express.json());

if (env.TYPE_ENV === 'production') {
	// Exprees will serve up production assets
	app.use(express.static('client/build'));
}

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
	.catch(`${err}: Could not connect to server`);
