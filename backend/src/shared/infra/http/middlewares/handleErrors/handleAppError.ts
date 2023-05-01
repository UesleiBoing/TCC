import { Response } from 'express';

import AppError from '@shared/errors/AppError';

export default function handleAppError(error: AppError, response: Response) {
  return response.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
}
