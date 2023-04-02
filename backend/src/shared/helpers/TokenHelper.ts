import { Request } from 'express';
import { verify } from 'jsonwebtoken';

interface IToken {
  id: number;
  isTeacher:boolean;
}

/**
 * @class TokenHelper - Helper class for token operations
 */
export default class TokenHelper {

  /**
   * Get token from request.
   * @param request - Request express
   * @returns token or undefined if not found.
   */
  public static getToken(request: Request): string | undefined {
    const authHeader: string | undefined = request.headers.authorization;

    if (!authHeader) {
      return undefined;
    }

    const [, token] = authHeader.split(' ');

    return token;
  }

  /**
   * Get token payload.
   * @param token - Token used or Request express.
   * @returns JSON of subject content
   */
  public static getSubject(token: string | Request): IToken {
    // if token is Request
    if (typeof token !== 'string') {
      token = TokenHelper.getToken(token) ?? '';
    }

    const { sub: contentToken } = verify(token, String(process.env.JWT_SECRET));

    return JSON.parse(String(contentToken));
  }

  /**
   * Get ID from token.
   * @param token - Token .
   * @returns ID of subject content.
   */
  public static getId(token: string): number {
    return this.getSubject(token).id;
  }

  /**
   * Get is user isPoint from token.
   * @param token - Token.
   * @returns boolean if is point.
   */
  public static isPointToken(token: string): boolean {
    return this.getSubject(token).isPoint;
  }

}
