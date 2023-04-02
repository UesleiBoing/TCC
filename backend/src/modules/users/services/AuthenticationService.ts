import { compare } from 'bcryptjs';
import Joi from 'joi';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import Service from '@shared/core/Service';
import AppError from '@shared/errors/AppError';
import ErrorMessages from '@shared/errors/ErrorMessages';

import ITeachersRepository from '@modules/users/repositories/ITeachersRepository';

import ILoginDTO from '../dtos/ILoginDTO';
import AuthenticateRequest from '../infra/http/requests/AuthenticateRequest';
import Student from '../infra/typeorm/entities/Student';
import Teacher from '../infra/typeorm/entities/Teacher';
import IStudentsRepository from '../repositories/IStudentsRepository';

interface IResponseLogin {
  user: {
    id: number,
    name: string,
    email: string
  },
  token: string;
}

@injectable()
export default class AuthenticationService extends Service {

  constructor(
    @inject('StudentsRepository')
    protected studentsRepository: IStudentsRepository,
    @inject('TeachersRepository')
    protected teachersRepository: ITeachersRepository,
  ) {
    super();
  }

  protected rules = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  public async login({ email, password }: ILoginDTO, teacherAuth: boolean): Promise<IResponseLogin> {
    await AuthenticateRequest.login({ email, password });

    let user: Student | Teacher | undefined;
    let isTeacher: boolean = false;

    if (teacherAuth) {
      user = await this.teachersRepository.findToLogin(email);
      isTeacher = true;
    } else {
      user = await this.repository.findToLogin(email);
    }

    if (!user) {
      throw new AppError(ErrorMessages.INVALID_LOGIN_ATTEMPT, 401);
    }

    if (user.password) {
      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        throw new AppError(ErrorMessages.INVALID_LOGIN_ATTEMPT, 401);
      }
    }

    let userContent = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = sign({}, String(process.env.JWT_SECRET), {
      subject: JSON.stringify({ id: user.id, isTeacher }),
      expiresIn: '30d',
    });

    return {
      user: userContent,
      token,
    };
  }

}
