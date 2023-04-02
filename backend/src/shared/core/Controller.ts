import { Request, Response } from 'express';

/**
 * @class Controller - Base class for all controllers.
 */
export default class Controller {

  /**
   * Get Id from request.
   * @param req Express Request.
   * @returns id from request.
   */
  public getIdParam(req: Request): number {
    return req.params.id as unknown as number;
  }

  /**
   * Create method of controller.
   * @param req - Express Request.
   * @param res - Express Response.
   * @returns API Response.
   */
  public async create(req: Request, res: Response): Promise<Response> {
    return res.json({ message: 'Method not implemented' });
  }

  /**
   * Find method of controller.
   * @param req - Express Request.
   * @param res - Express Response.
   * @returns API Response.
   */
  public async find(req: Request, res: Response): Promise<Response> {
    return res.json({ message: 'Method not implemented' });
  }

  /**
   * FindOne method of controller.
   * @param req - Express Request.
   * @param res - Express Response.
   * @returns API Response.
   */
  public async findOne(req: Request, res: Response): Promise<Response> {
    return res.json({ message: 'Method not implemented' });
  }

  /**
   * Update method of controller.
   * @param req - Express Request.
   * @param res - Express Response.
   * @returns API Response.
   */
  public async update(req: Request, res: Response): Promise<Response> {
    return res.json({ message: 'Method not implemented' });
  }

  /**
   * Delete method of controller.
   * @param req - Express Request.
   * @param res - Express Response.
   * @returns API Response.
   */
  public async delete(req: Request, res: Response): Promise<Response> {
    return res.json({ message: 'Method not implemented' });
  }

}
