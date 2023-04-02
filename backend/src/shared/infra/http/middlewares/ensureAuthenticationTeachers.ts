import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ErrorMessages from '@shared/errors/ErrorMessages';
import CommunicationHelper from '@shared/helpers/CommunicationHelper';
import TokenHelper from '@shared/helpers/TokenHelper';

import Teacher from '@modules/users/infra/typeorm/entities/Teacher';
import TeachersService from '@modules/users/services/TeachersService';

/**
 * Check if point is authenticated.
 * @param request - Request express
 * @param response - Response express
 * @param next - Next function
 * @returns
 */
export default async function ensureAuthenticationTeacher(
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
    const pointToken = TokenHelper.getSubject(String(TokenHelper.getToken(request)));

    let pointsService: TeachersService | undefined;

    if (pointToken.isTeacher) {
      pointsService = container.resolve(TeachersService);
    } else {
      return response.status(401).json(
        CommunicationHelper.error(
          new AppError(ErrorMessages.INVALID_LOGIN_ATTEMPT, 422),
        ),
      );
    }

    const point: Teacher | undefined = await pointsService.findOne(pointToken.id);
    if (!point) {
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
