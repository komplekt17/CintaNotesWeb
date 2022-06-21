import express from 'express';
import cors from 'cors';

import { dbConnect } from './helpers';
import { PORT_SERVICE_API, TYPE_ENV } from './constants';
import {
	sectionsRouter,
	tagsRouter,
	notesRouter,
	usersRouter,
} from './routes';

const app = express();

app.use(cors());
app.use(express.json());

// if (TYPE_ENV === 'production') {
// 	// Exprees will serve up production assets
// 	app.use(express.static('client/build'));
// }

app.use('/sections', sectionsRouter);
app.use('/tags', tagsRouter);
app.use('/notes', notesRouter);
app.use('/users', usersRouter);

// синхронизация с бд, после успешной синхронизации запускаем сервер
dbConnect
	.sync({ force: false })
	.then(() => {
		app.listen(PORT_SERVICE_API, () => {
			console.log(`Server is running on port: ${PORT_SERVICE_API}`);
		});
	})
	.catch((err) => `${err}: Could not connect to server`);
