import { Request, Response } from 'express';
import { container } from 'tsyringe';

import Controller from '@shared/core/Controller';

import TeachersService from '@modules/users/services/TeachersService';

import TeacherRequest from '../requests/TeacherRequest';

export default class TeachersController extends Controller {

  public async numberFormsByTeacher(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(TeachersService);
    const result = await service.numberFormsByTeacher(Number(req.params.id));

    return res.status(200).json(result);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(TeachersService);
    const result = await service.create(req.body);

    return res.status(200).json(result);
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(TeachersService);
    const result = await service.findAll();

    return res.status(200).json(result);
  }

  public async findOne(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);

    const service = container.resolve(TeachersService);
    const result = await service.findOneFullData(id);

    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);

    TeacherRequest.isTokenOwner(id, req);

    const service = container.resolve(TeachersService);
    const result = await service.update(id, req.body);

    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);
    TeacherRequest.isTokenOwner(id, req);

    const service = container.resolve(TeachersService);
    const result = await service.delete(id);

    return res.json(result);
  }

}
