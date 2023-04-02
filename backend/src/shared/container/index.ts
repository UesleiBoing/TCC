/* eslint-disable no-multi-spaces */
/* eslint-disable import/order */
import { container } from 'tsyringe';

/**
 * Register a dependency in the container
 * Path: backend\src\shared\container\index.ts
 */

/**
 * USERS MODULE
 */
import ITeachersRepository            from '@modules/users/repositories/ITeachersRepository';
import TeachersRepository             from '@modules/users/infra/typeorm/repositories/TeachersRepository';

import IStudentsRepository            from '@modules/users/repositories/IStudentsRepository';
import StudentsRepository             from '@modules/users/infra/typeorm/repositories/StudentsRepository';

/**
 * USERS MODULE
 */
container.registerSingleton<ITeachersRepository>('TeachersRepository', TeachersRepository);
container.registerSingleton<IStudentsRepository>('StudentsRepository', StudentsRepository);
