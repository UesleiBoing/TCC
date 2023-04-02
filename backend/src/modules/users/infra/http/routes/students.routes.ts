import { Router } from 'express';

import ensureAuthenticationStudents from '@shared/infra/http/middlewares/ensureAuthenticationStudents';

import StudentsController from '../controllers/StudentsController';

const studentsRouter = Router();
const studentsController = new StudentsController();

studentsRouter.get('/', ensureAuthenticationStudents, studentsController.find);
studentsRouter.post('/', studentsController.create);
studentsRouter.get('/:id', ensureAuthenticationStudents, studentsController.findOne);
studentsRouter.put('/:id', ensureAuthenticationStudents, studentsController.update);
studentsRouter.patch('/:id', ensureAuthenticationStudents, studentsController.update);
studentsRouter.delete('/:id', ensureAuthenticationStudents, studentsController.delete);

export default studentsRouter;
