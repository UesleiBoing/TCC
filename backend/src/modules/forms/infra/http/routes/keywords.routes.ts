import { Router } from 'express';

import ensureAuthenticationStudentsTeachers from '@shared/infra/http/middlewares/ensureAuthenticationStudentsTeachers';
import ensureAuthenticationTeachers from '@shared/infra/http/middlewares/ensureAuthenticationTeachers';

import KeywordsController from '../controllers/KeywordsController';

const keywordsRouter = Router();
const keywordsController = new KeywordsController();

keywordsRouter.get('/', ensureAuthenticationStudentsTeachers, keywordsController.find);
keywordsRouter.get('/:id', ensureAuthenticationStudentsTeachers, keywordsController.findOne);
keywordsRouter.post('/', ensureAuthenticationTeachers, keywordsController.create);
keywordsRouter.put('/:id', ensureAuthenticationTeachers, keywordsController.update);
keywordsRouter.patch('/:id', ensureAuthenticationTeachers, keywordsController.update);
keywordsRouter.delete('/:id', ensureAuthenticationTeachers, keywordsController.delete);

export default keywordsRouter;
