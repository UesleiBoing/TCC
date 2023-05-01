import { Response } from 'express';

export default function unknownError(error: Error, response: Response) {
  return response.status(500).json({
    status: 'error',
    message: `Internal server error: \n${error.message}`,
    data: error,
  });
}
