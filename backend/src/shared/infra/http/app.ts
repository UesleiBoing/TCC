import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import cors from 'cors';
import express from 'express';

import handleErrors from '@shared/infra/http/middlewares/handleErrors';

import routes from './routes';

import '@shared/container';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);
app.use(handleErrors);

export default app;
