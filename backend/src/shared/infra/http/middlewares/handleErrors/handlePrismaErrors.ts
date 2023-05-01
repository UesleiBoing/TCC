import { Prisma } from '@prisma/client';
import { Response } from 'express';

export default function handlePrismaError(
  error: Prisma.PrismaClientKnownRequestError,
  response: Response,
) {
  let errorMessage = 'An unexpected error occurred while processing the request.';
  let fieldName = '';

  console.log('error aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  console.log(error);
  console.log(error.code);
  switch (error.code) {
    case 'P2000':
      fieldName = error.meta?.target !== undefined
        ? (error.meta?.target as string[]).join('.')
        : '';

      errorMessage = `The provided value for the field '${fieldName}' is too long.`;
      break;
    case 'P2002':
      fieldName = (error.meta?.target as string[]).join(', ');
      errorMessage = `The provided value for the field '${fieldName}' already exists.`;
      break;
    case 'P2003':
      fieldName = error.meta?.field_name as string;
      errorMessage = `Foreign key constraint failed on the field: '${fieldName}'`;
      break;
    case 'P2014':
      fieldName = error.meta?.field_name as string;
      errorMessage = `The field '${fieldName}' is required.`;
      break;
    case 'P2011':
      fieldName = (error.meta?.constraint as string[])
        .map((el) => `'${el}'`)
        .join(', ');

      errorMessage = `Null constraint violation on the fields: (${fieldName})`;
      break;
    case 'P2016':
      fieldName = (error.meta?.target as string[]).join('.');
      errorMessage = `The provided value for the field '${fieldName}' violates a constraint.`;
      break;
    case 'P2025':
      errorMessage = error?.meta?.cause as string;
      break;
    case 'P2026':
      fieldName = (error.meta?.target as string[]).join('.');
      errorMessage = `The provided value for the field '${fieldName}' is too short.`;
      break;
    case 'P2027':
      fieldName = (error.meta?.target as string[]).join('.');
      errorMessage = `The provided value for the field '${fieldName}' is invalid.`;
      break;
    case 'P2028':
      fieldName = (error.meta?.target as string[]).join('.');
      errorMessage = `The provided value for the field '${fieldName}' is not in the expected format.`;
      break;
    case 'P2031':
      fieldName = (error.meta?.target as string[]).join('.');
      errorMessage = `The provided value for the field '${fieldName}' is outside of the allowed range.`;
      break;
    case 'P2041':
      fieldName = (error.meta?.target as string[]).join('.');
      errorMessage = `The provided value for the field '${fieldName}' is not unique.`;
      break;
    default:
      break;
  }

  return response.status(400).json({
    success: false,
    message: errorMessage,
  });
}
