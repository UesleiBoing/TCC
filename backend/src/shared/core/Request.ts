import { Request as RequestExpress } from 'express';
import Joi from 'joi';

import AppError from '@shared/errors/AppError';
import ErrorMessages from '@shared/errors/ErrorMessages';
import TokenHelper from '@shared/helpers/TokenHelper';
import ValidationHelper from '@shared/helpers/ValidationHelper';
import IFiles from '@shared/interfaces/IFiles';

export default abstract class Request {

  /**
   * Rules properties to validate.
   */
  protected static rulesId: Joi.ObjectSchema<any> = Joi.object({ id: Joi.number().required() });

  protected static rules: Joi.ObjectSchema<any> = Joi.object({});

  /**
   * Function to validate if ID is number
   * @param id - Id to validate.
   */
  public static checkId(id:number): void {
    const { error } = this.rulesId.validate({ id });

    if (error) {
      throw new AppError(ErrorMessages.ID_NOT_NUMBER);
    }
  }

  /**
   * Validate rules of request.
   * @param data - Data to validate.
   * @param altValidation - Alternative validation Joi.ObjectSchema<any>.
   */
  public static protocolValidation(
    data: any,
    altValidation: Joi.ObjectSchema<any> | undefined = undefined,
  ): void {
    const rules = altValidation || this.rules;

    const { error } = rules.validate(data);

    if (error) {
      throw new AppError(ValidationHelper.getJoiErrorMessage(error));
    }
  }

  /**
   * Function to validate default rules and call specific rules.
   * @param data - Data to validate.
   */
  public static async create(data: any): Promise<void> {
    this.protocolValidation(data);

    await this.rulesCreate(data);
  }

  /**
   * Validate specific rules of create request.
   * @param data - Data to validate.
   */
  public static async rulesCreate(data: any): Promise<void> {
    // do nothing
  }

  /**
   * Function to validate default rules and call specific rules.
   * @param data - Data to validate.
   */
  public static async update({ id, ...data }: any): Promise<void> {
    this.checkId(id);

    this.protocolValidation(data);

    await this.rulesUpdate({ id, ...data });
  }

  /**
   * Specific rules to validate update request.
   * @param data - Data to validate.
   */
  public static async rulesUpdate(data: any): Promise<void> {
    // do nothing
  }

  /**
   * Check if request.files has files
   * @param files - request.files as IFiles[].
   */
  public static haveFiles(files: IFiles[]): void {
    if (!Array.isArray(files) || files.length === 0) {
      throw new AppError(ErrorMessages.FILE_DOESNT_EXIST, 422);
    }
  }

  /**
   * Check if id used match with id on JSON Web Token.
   * @param id - Id to validate.
   * @param req - RequestExpress.
   */
  public static isTokenOwner(id:number, req: RequestExpress | string) {
    const tokenSubject = TokenHelper.getSubject(req);

    if (id !== tokenSubject.id) {
      throw new AppError(ErrorMessages.INVALID_LOGIN_ATTEMPT, 401);
    }

    return true;
  }

  /**
   * Validate default rules of findOneFullData method
   * By default, only id is required, but more propertys can be passed.
   * @param data - Data to validate.
   */
  public static async findOneFullData({ id }: any): Promise<void> {
    this.checkId(id);
  }

}
