import { hash } from 'bcryptjs';
import { Router } from 'express';

import ensureAuthenticationStudentsTeachers from '@shared/infra/http/middlewares/ensureAuthenticationStudentsTeachers';
import ensureAuthenticationTeachers from '@shared/infra/http/middlewares/ensureAuthenticationTeachers';
import client from '@shared/infra/prisma/client';

import TeachersController from '../controllers/TeachersController';

const teachersRouter = Router();
const teachersController = new TeachersController();

teachersRouter.get('/', ensureAuthenticationStudentsTeachers, teachersController.find);
teachersRouter.post('/', teachersController.create);
teachersRouter.get('/:id', ensureAuthenticationTeachers, teachersController.findOne);
teachersRouter.get('/quantity-forms/:id', teachersController.numberFormsByTeacher);
teachersRouter.put('/:id', ensureAuthenticationTeachers, teachersController.update);
teachersRouter.patch('/:id', ensureAuthenticationTeachers, teachersController.update);
teachersRouter.delete('/:id', ensureAuthenticationTeachers, teachersController.delete);

teachersRouter.post('/seeder', async (req, res) => {
  let d = new Date().getTime();

  const seed = await client.teacher.create({
    data: {
      name: 'Teste',
      email: `${d.toString()}@gmail.com`,
      password: await hash('12345678', 8),
    },

  });
  res.status(200).json(seed);
});

export default teachersRouter;
