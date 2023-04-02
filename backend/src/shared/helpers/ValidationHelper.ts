/* eslint-disable eqeqeq */
/* eslint-disable no-mixed-operators */
import Joi from 'joi';

import AppError from '@shared/errors/AppError';
import ErrorMessages from '@shared/errors/ErrorMessages';

/**
 * @class ValidationHelper - Helper class for validation.
 */
export default class ValidationHelper {

  /**
   * Regex patterns.
   */
  public static REGEX_NUMBER: RegExp = /^[0-9]+$/;

  public static REGEX_PASSWORD_DIGIT: RegExp = /\d/;
  public static REGEX_PASSWORD_LOWERCASE: RegExp = /[a-z]/;
  public static REGEX_PASSWORD_UPPERCASE: RegExp = /[A-Z]/;
  public static REGEX_PASSWORD_SPECIAL: RegExp = /\W/;
  public static REGEX_PASSWORD_SPACE: RegExp = /\s/;

  /**
   * Get errors from Joi validation.
   * @param error -Joi error.
   * @returns Message of error.
   */
  public static getJoiErrorMessage(error: Joi.ValidationError): string {
    return error.details[0].message;
  }

  /**
   * Check if variable is error.
   * @param variable - Variable to be validated.
   * @returns If variable is AppError.
   */
  public static isError(variable: any): boolean {
    return variable instanceof AppError;
  }

  /**
   * Get only numbers.
   * @param value - Value.
   * @returns Only digits of value.
   */
  public static getOnlyNumbers(value:any) {
    return value.replace(/\D/g, '');
  }

  /**
   * Get only letters.
   * @param value - Vaue
   * @returns Only letters of value
   */
  public static getOnlyLetters(value:any) {
    return value.replace(/\d/g, '');
  }

  /**
     * Validate password.
     * @param value - Password.
     * @returns True if password is valid.
     */
  public static validationPassword(value: string): true {
    if (value.length < 8) {
      throw new AppError(ErrorMessages.PASSWORD_DIGITS, 422);
    }

    if (!/[a-z]/.test(value)) {
      throw new AppError(ErrorMessages.PASSWORD_LOWERCASE, 422);
    }

    if (!/[A-Z]/.test(value)) {
      throw new AppError(ErrorMessages.PASSWORD_UPPERCASE, 422);
    }

    if (!/[0-9]/.test(value)) {
      throw new AppError(ErrorMessages.PASSWORD_NUMBER, 422);
    }

    if (!/[!@#$%^&*]/.test(value)) {
      throw new AppError(ErrorMessages.PASSWORD_SPECIAL_CHARACTER, 422);
    }

    return true;
  }

  // /(?=.*[a-z])/
  // /(?=.*[A-Z])/
  // /(?=.*[0-9])/
  // /(?=.*[!@#$%^&*])/

  /**
     * Check if value is JSON
     * @param str - string
     * @returns True if is JSON.
     */
  public static isJson(str: string): boolean {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

}
