import path from 'path';

import express, { Router } from 'express';

import answersRouter from '@modules/forms/infra/http/routes/answers.routes';
import formsRouter from '@modules/forms/infra/http/routes/forms.routes';
import keywordsRouter from '@modules/forms/infra/http/routes/keywords.routes';
import questionsRouter from '@modules/forms/infra/http/routes/questions.routes';
import testsRouter from '@modules/forms/infra/http/routes/tests.routes';
import classesRouter from '@modules/university/infra/http/routes/classes.routes';
import subjectsRouter from '@modules/university/infra/http/routes/subjects.routes';
import topicsRouter from '@modules/university/infra/http/routes/topics.routes';
import authenticationRouter from '@modules/users/infra/http/routes/authentication.routes';
import studentsRouter from '@modules/users/infra/http/routes/students.routes';
import teachersRouter from '@modules/users/infra/http/routes/teachers.routes';

const routes = Router();

routes.use(authenticationRouter);

routes.use('/students', studentsRouter);
routes.use('/teachers', teachersRouter);

routes.use('/classes', classesRouter);
routes.use('/subjects', subjectsRouter);
routes.use('/topics', topicsRouter);

routes.use('/answers', answersRouter);
routes.use('/forms', formsRouter);
routes.use('/keywords', keywordsRouter);
routes.use('/questions', questionsRouter);
routes.use('/tests', testsRouter);

routes.use('/uploads/products', express.static(
  path.resolve(__dirname, '..', '..', '..', '..', '..', 'tmp', 'products'),
));

routes.use('/uploads/points', express.static(
  path.resolve(__dirname, '..', '..', '..', '..', '..', 'tmp', 'points'),
));

routes.use('/uploads/users', express.static(
  path.resolve(__dirname, '..', '..', '..', '..', '..', 'tmp', 'users'),
));

export default routes;
