import { Request } from 'express';

import AppError from '@shared/errors/AppError';
import ErrorMessages from '@shared/errors/ErrorMessages';
import Repository from '@shared/infra/typeorm/repositories/Repository';
import IWhereTypeORM from '@shared/interfaces/typeorm/IWhereTypeORM';

import Field from './Field';
import ModelCore from './ModelCore';

interface IQuery {
  [key: string]: string
}

/**
 * Get parameters from query request to filter better.
 * Based on https://support.americommerce.com/hc/en-us/articles/202836800-API-Searching-and-Filtering
 */
export default class OptionalParameters {

  /**
   * Receive a request and a model.
   * @param req - Express Request
   * @param model - Class Model to get fields
   */
  constructor(req: Request, model: typeof ModelCore) {
    this.handleQuery(req.query as IQuery, model);
  }

  /**
   * Valid querys to filter.
   */
  public validQuerys: IWhereTypeORM = {};

  /**
   * Operators used in API.
   */
  public static OPERATOR_EQUAL = 'eq';

  public static OPERATOR_NOT = 'not';

  public static OPERATOR_LIKE = 'like';

  public static OPERATOR_ILIKE = 'ilike';

  public static OPERATOR_MORE_THAN = 'gt';

  public static OPERATOR_MORE_THAN_OR_EQUAL = 'gte';

  public static OPERATOR_LESS_THAN = 'lt';

  public static OPERATOR_LESS_THAN_OR_EQUAL = 'lte';

  /**
   * Available operators to handle string data.
   */
  public static AVAILABLE_OPERATORS_STRING = [
    OptionalParameters.OPERATOR_EQUAL,
    OptionalParameters.OPERATOR_NOT,
    OptionalParameters.OPERATOR_LIKE,
    OptionalParameters.OPERATOR_ILIKE,
  ];

  /**
   * Available operators to handle number data.
   */
  public static AVAILABLE_OPERATORS_NUMBER = [
    OptionalParameters.OPERATOR_EQUAL,
    OptionalParameters.OPERATOR_NOT,
    OptionalParameters.OPERATOR_MORE_THAN,
    OptionalParameters.OPERATOR_MORE_THAN_OR_EQUAL,
    OptionalParameters.OPERATOR_LESS_THAN,
    OptionalParameters.OPERATOR_LESS_THAN_OR_EQUAL,
  ];

  /**
   * Available operators to handle date data.
   */
  public static AVAILABLE_OPERATORS_DATE = [
    OptionalParameters.OPERATOR_EQUAL,
    OptionalParameters.OPERATOR_NOT,
    OptionalParameters.OPERATOR_MORE_THAN,
    OptionalParameters.OPERATOR_MORE_THAN_OR_EQUAL,
    OptionalParameters.OPERATOR_LESS_THAN,
    OptionalParameters.OPERATOR_LESS_THAN_OR_EQUAL,
  ];

  /**
   * Get filters.
   * @returns valid querys to filter.
   */
  public filter() {
    return this.validQuerys;
  }

  /**
   * Handle Query if its in a desired field.
   * @param query - Request queries to handle.
   * @param model - Model to get fields.
   */
  private handleQuery(query: IQuery, model: typeof ModelCore) {
    Object.keys(query).forEach((key) => {
      if (key in model.fields) {
        this.handleFilter(key, (model.fields as any)[key].type, query[key]);
      }
    });
  }

  /**
   * Handle filter checking if operator is valid according to data type.
   * @param key - Query's key.
   * @param type - Type of data.
   * @param bruteVal - Brute value to handle.
   * @returns Where object built.
   */
  private handleFilter(key: string, type: number, bruteVal: string) {
    const [operator, value] = this.getFilterData(bruteVal);

    if (this.correctConditionsString(type, operator)) {
      return this.buildWhere(key, operator, value);
    } if (this.correctConditionsNumber(type, operator)) {
      return this.buildWhere(key, operator, value);
    } if (this.correctConditionsDate(type, operator)) {
      return this.buildWhere(key, operator, value);
    }

    throw new AppError(ErrorMessages.INVALID_OPERATOR_QUERY_PARAM(key), 400);
  }

  /**
   * Check if operator is valid for string data.
   * @param type - Type of data.
   * @param operator - Operator to check.
   * @returns True if operator is valid.
   */
  private correctConditionsString(type: number, operator:string): boolean {
    return (
      type === Field.TYPE_STRING
            && OptionalParameters.AVAILABLE_OPERATORS_STRING.includes(operator)
    );
  }

  /**
   * Check if operator is valid for number data.
   * @param type - Type of data.
   * @param operator - Operator to check.
   * @returns True if operator is valid.
   */
  private correctConditionsNumber(type: number, operator:string): boolean {
    return (
      type === Field.TYPE_NUMBER
            && OptionalParameters.AVAILABLE_OPERATORS_NUMBER.includes(operator)
    );
  }

  /**
   * Check if operator is valid for date data.
   * @param type - Type of data.
   * @param operator - Operator to check.
   * @returns True if operator is valid.
   */
  private correctConditionsDate(type: number, operator:string): boolean {
    return (
      type === Field.TYPE_DATE
            && OptionalParameters.AVAILABLE_OPERATORS_DATE.includes(operator)
    );
  }

  /**
   * Handle value to separate value and operator.
   * @param value - Value to handle.
   * @returns [operator, value]
   */
  private getFilterData(value:string): [string, string] {
    const [first, second] = value.split(/:(.*)/s); // split on first colon

    if (!second) {
      return [OptionalParameters.OPERATOR_EQUAL, first];
    }

    return [first, second];
  }

  /**
   * Function to build Where Object based on parameters
   * @param key - Field to filter.
   * @param operator - Operator to filter.
   * @param bruteVal - Value to filter.
   */
  private buildWhere(key: string, operator: string, bruteVal: string) {
    let val = bruteVal;
    let result: IWhereTypeORM;

    switch (operator) {
      case OptionalParameters.OPERATOR_EQUAL:
        result = Repository.optionalWhere(key, val);
        break;
      case OptionalParameters.OPERATOR_NOT:
        result = Repository.optionalWhereNot(key, val);
        break;
      case OptionalParameters.OPERATOR_LIKE:
        result = Repository.optionalWhereLike(key, val);
        break;
      case OptionalParameters.OPERATOR_ILIKE:
        result = Repository.optionalWhereILike(key, val);
        break;
      case OptionalParameters.OPERATOR_MORE_THAN:
        result = Repository.optionalWhereMoreThan(key, val);
        break;
      case OptionalParameters.OPERATOR_MORE_THAN_OR_EQUAL:
        result = Repository.optionalWhereMoreThanOrEqual(key, val);
        break;
      case OptionalParameters.OPERATOR_LESS_THAN:
        result = Repository.optionalWhereLessThan(key, val);
        break;
      case OptionalParameters.OPERATOR_LESS_THAN_OR_EQUAL:
        result = Repository.optionalWhereLessThanOrEqual(key, val);
        break;
      default:
        result = Repository.optionalWhere(key, operator + val);
        break;
    }

    this.validQuerys = { ...this.validQuerys, ...result };
  }

}
