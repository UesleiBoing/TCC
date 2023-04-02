import ErrorMessages from './ErrorMessages';

/**
 * @class Default app error.
 */
export default class AppError extends Error {

  /**
   * Propertys
   */
  public message: string;

  public statusCode: number;

  public data: any;

  /**
   * Database code errors
   */
  private static CODE_ERROR_UNIQUE: string = '23503';

  private static CODE_ERROR_DONT_EXIST: string = '23505';

  constructor(message: string, statusCode = 400, data = undefined) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;

    if (this.data) {
      this.handleUnexpected();
    }
  }

  /**
   * Handle unexpected Erros
   */
  private handleUnexpected() {
    if (this.data.routine === AppError.CODE_ERROR_UNIQUE) {
      this.message = ErrorMessages.DATABASE_UNIQUE;
    } else if (this.data.routine === AppError.CODE_ERROR_DONT_EXIST) {
      this.message = ErrorMessages.DATABASE_EXIST;
    }

    if (process.env.ENVIROMENT !== 'dev') {
      this.clearData();
    }
  }

  /**
   * Clear Data
   */
  private clearData() {
    this.data = [];
  }

}
