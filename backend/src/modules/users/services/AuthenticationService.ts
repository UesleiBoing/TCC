import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import Service from '@shared/core/Service';
import AppError from '@shared/errors/AppError';
import ErrorMessages from '@shared/errors/ErrorMessages';
import client from '@shared/infra/prisma/client';

import ILoginDTO from '../dtos/ILoginDTO';
import AuthenticateRequest from '../infra/http/requests/AuthenticateRequest';

interface IResponseLogin {
  user: {
    id: number
    name: string
    email: string
  }
  token: string
}

@injectable()
export default class AuthenticationService extends Service {

  public async login(
    { email, password }: ILoginDTO,
    teacherAuth: boolean,
  ): Promise<IResponseLogin> {
    AuthenticateRequest.protocolValidation({ email, password });

    let user;
    let isTeacher: boolean = false;

    if (teacherAuth) {
      user = await client.teacher.findFirst({
        where: { email },
      });
      isTeacher = true;
    } else {
      user = await client.student.findFirst({
        where: { email },
      });
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
      isTeacher,
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
