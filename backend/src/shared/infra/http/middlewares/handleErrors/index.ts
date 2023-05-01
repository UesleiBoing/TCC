import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import AppError from '@shared/errors/AppError';

import handleAppError from './handleAppError';
import handlePrismaError from './handlePrismaErrors';
import unknownError from './handleUnknownError';
import handleZodError from './handleZodErrors';

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
  console.log('error')
  console.log(error)
  if (error instanceof AppError) {
    return handleAppError(error, response);
  }

  if (error instanceof ZodError) {
    return handleZodError(error, response);
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaError(error, response);
  }

  return unknownError(error, response);

}
