import AppError from '@shared/errors/AppError';

import ValidationHelper from './ValidationHelper';

/**
 * @class CommunicationHelper - Helpers to output API response.
 */
export default class CommunicationHelper {

  /**
   * Return a success response.
   * @param data - Data to be returned.
   * @returns Default success response.
   */
  public static success(data: any): object {
    return { success: true, data };
  }

  /**
   * Return a error response.
   * @param data - Data to be returned.
   * @returns Default error response.
   */
  public static error(data: any): AppError | object {
    if (ValidationHelper.isError(data)) {
      return { success: false, ...data };
    }

    return new AppError(data?.message, data?.data, data?.statusCode);
  }

}
