import { hash } from 'bcryptjs';
import { Router } from 'express';

import ensureAuthenticationStudentsTeachers from '@shared/infra/http/middlewares/ensureAuthenticationStudentsTeachers';
import client from '@shared/infra/prisma/client';

import StudentsController from '../controllers/StudentsController';

const studentsRouter = Router();
const studentsController = new StudentsController();

studentsRouter.get('/', ensureAuthenticationStudentsTeachers, studentsController.find);
studentsRouter.post('/', studentsController.create);
studentsRouter.get('/:id', ensureAuthenticationStudentsTeachers, studentsController.findOne);
studentsRouter.put('/:id', ensureAuthenticationStudentsTeachers, studentsController.update);
studentsRouter.patch('/:id', ensureAuthenticationStudentsTeachers, studentsController.update);
studentsRouter.delete('/:id', ensureAuthenticationStudentsTeachers, studentsController.delete);

studentsRouter.post('/seeder', async (req, res) => {
  let d = new Date().getTime();

  const seed = await client.student.create({
    data: {
      name: 'Teste',
      email: `${d.toString()}@gmail.com`,
      password: await hash('12345678', 8),
    },

  });
  res.status(200).json(seed);
});

export default studentsRouter;
