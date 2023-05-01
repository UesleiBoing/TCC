import { Request, Response } from 'express';
import { container } from 'tsyringe';

import Controller from '@shared/core/Controller';

import AuthenticationService from '@modules/users/services/AuthenticationService';

export default class AuthenticationController extends Controller {

  public async login(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(AuthenticationService);
    const result = await service.login(req.body, !!req.query.isTeacher);

    return res.status(200).json(result);
  }

}
