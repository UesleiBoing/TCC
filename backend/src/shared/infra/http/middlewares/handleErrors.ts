import { NextFunction, Request, Response } from 'express';

import AppError from '@shared/errors/AppError';

/**
 * Handle errors when an AppErros iw thrown.
 * @param error - Error
 * @param request - Request express
 * @param response - Response express
 * @param next = Next function
 * @returns
 */
export default function handleErrors(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Response {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: error.data,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error: \n${error.message}`,
  });

}
