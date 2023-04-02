import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ErrorMessages from '@shared/errors/ErrorMessages';
import CommunicationHelper from '@shared/helpers/CommunicationHelper';
import TokenHelper from '@shared/helpers/TokenHelper';

import Student from '@modules/users/infra/typeorm/entities/Student';
import Teacher from '@modules/users/infra/typeorm/entities/Teacher';
import StudentsService from '@modules/users/services/StudentsService';
import TeachersService from '@modules/users/services/TeachersService';

/**
 * Check if point or user is authenticated.
 * @param request - Request express
 * @param response - Response express
 * @param next - Next function
 * @returns
 */
export default async function ensureAuthenticationStudentsTeachers(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader: string | undefined = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json(
      CommunicationHelper.error(
        new AppError(ErrorMessages.TOKEN_NOT_PROVIDED, 422),
      ),
    );
  }

  try {
    const userToken = TokenHelper.getSubject(String(TokenHelper.getToken(request)));

    let usersService: StudentsService | TeachersService | undefined;

    if (userToken.isTeacher) {
      usersService = container.resolve(TeachersService);
    } else {
      usersService = container.resolve(StudentsService);
    }

    const user: Student | Teacher | undefined = await usersService.findOne(userToken.id);
    if (!user) {
      return response.status(401).json(
        CommunicationHelper.error(
          new AppError(ErrorMessages.INVALID_LOGIN_ATTEMPT, 422),
        ),
      );
    }

    return next();
  } catch (error) {
    return response.status(401).json(
      CommunicationHelper.error(
        new AppError(ErrorMessages.INVALID_TOKEN, 422),
      ),
    );
  }

}
