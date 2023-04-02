import { NextFunction, Request, Response } from 'express';

import AppError from '@shared/errors/AppError';
import ErrorMessages from '@shared/errors/ErrorMessages';
import CommunicationHelper from '@shared/helpers/CommunicationHelper';

/**
 * Convert JSON into body request if request has JSON property.
 * Needed for multipart data-form with Images and json.
 * @param request - Request express
 * @param response - Response express
 * @param next - Next function
 * @returns
 */
export default async function convertJson(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    if (request.body.json) {
      request.body = {
        ...request.body,
        ...JSON.parse(request.body.json),
      };

      delete request.body.json;
    }

    return next();
  } catch (error) {
    return response.status(401).json(
      CommunicationHelper.error(
        new AppError(ErrorMessages.JSON_INVALID, 401),
      ),
    );
  }

}
