import { Request as RequestExpress } from 'express';
import { z } from 'zod';

import AppError from '@shared/errors/AppError';

import ErrorMessages from '../errors/ErrorMessages';
import TokenHelper from '../helpers/TokenHelper';
import IFiles from '../interfaces/IFiles';

export default abstract class Request {

  /**
   * Rules properties to validate.
   */
  protected static idSchema: z.ZodObject<any> = z.object({ id: z.number() });

  protected static schema: z.ZodObject<any> = z.object({});

  /**
   * Validate that the given id attribute value is of type number
   * @param id - The id attribute to validate
   */
  public static checkId(id: number): void {
    this.idSchema.parse({ id });
  }

  /**
   * Validate the given data object with the baseSchema or an optional customized schema
   * @param data - The data object to validate
   * @param customSchema - An optional Zod schema object to be used instead of the default one
   */
  public static protocolValidation(
    data: any,
    customSchema?: z.ZodObject<any>,
  ): void {
    const schema = customSchema || this.schema;

    const { error } = schema.parse(data);
  }

  /**
   * Function to validate default rules and call specific rules.
   * @param data - Data to validate.
   */
  public static async create(data: any): Promise<void> {
    this.protocolValidation(data);

    await this.customCreateValidation(data);
  }

  /**
   * Hook method to accept custom create request validation
   * @param data - The data to be used for the custom validation
   */
  public static async customCreateValidation(data: any): Promise<void> {
    // do nothing
  }

  /**
   * Function to validate default rules and call specific rules.
   * @param data - Data to validate.
   */
  public static async update({ id, ...data }: any): Promise<void> {
    this.checkId(id);
    this.protocolValidation(data);

    await this.customUpdateValidation({ id, ...data });
  }

  /**
   * Specific rules to validate update request.
   * @param data - Data to validate.
   */
  public static async customUpdateValidation(data: any): Promise<void> {
    // do nothing
  }

  /**
   * Check if request.files has files.
   * @param files - request.files as IFiles[].
   */
  public static haveFiles(files: IFiles[]): void {
    if (!Array.isArray(files) || files.length === 0) {
      throw new AppError(ErrorMessages.FILE_DOESNT_EXIST);
    }
  }

  /**
   * Check if id used match with id on JSON Web Token.
   * @param id - Id to validate.
   * @param req - RequestExpress.
   */
  public static isTokenOwner(id: number, req: RequestExpress): boolean {
    const tokenSubject = TokenHelper.getSubject(req);

    if (id !== tokenSubject?.id) {
      throw new AppError(ErrorMessages.INVALID_LOGIN_ATTEMPT);
    }

    return true;
  }

  /**
   * Validate default rules of findOneFullData method.
   * By default, only id is required, but more properties can be passed.
   * @param data - Data to validate.
   */
  public static async findOneFullData({ id }: any): Promise<void> {
    this.checkId(id);
  }

  public static async delete({ id }: any): Promise<void> {
    this.checkId(id);
  }

}
