import { Request, Response } from 'express';
import { container } from 'tsyringe';

import Controller from '@shared/core/Controller';

import StudentsService from '@modules/users/services/StudentsService';

import StudentRequest from '../requests/StudentRequest';

export default class StudentsController extends Controller {

  public async numberFormsByStudent(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(StudentsService);
    const result = await service.numberFormsByStudent(Number(req.params.id));

    return res.status(200).json(result);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(StudentsService);
    const result = await service.create(req.body);

    return res.status(200).json(result);
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(StudentsService);
    const result = await service.findAll();

    return res.status(200).json(result);
  }

  public async findOne(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);

    const service = container.resolve(StudentsService);
    const result = await service.findOneFullData(id);

    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);

    StudentRequest.isTokenOwner(id, req);

    const service = container.resolve(StudentsService);
    const result = await service.update(id, req.body);

    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);
    StudentRequest.isTokenOwner(id, req);

    const service = container.resolve(StudentsService);
    const result = await service.delete(id);

    return res.json(result);
  }

}
