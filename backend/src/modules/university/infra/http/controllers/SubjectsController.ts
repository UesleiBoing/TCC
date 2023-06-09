import { Request, Response } from 'express';
import { container } from 'tsyringe';

import Controller from '@shared/core/Controller';

import SubjectsService from '@modules/university/services/SubjectsService';

import SubjectRequest from '../requests/SubjectRequest';

export default class SubjectsController extends Controller {

  public async create(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(SubjectsService);
    const result = await service.create(req.body);

    return res.status(200).json(result);
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(SubjectsService);
    const result = await service.findAll();

    return res.status(200).json(result);
  }

  public async findOne(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);

    const service = container.resolve(SubjectsService);
    const result = await service.findOneFullData(id);

    return res.status(200).json(result);
  }

  public async findByStudent(req: Request, res: Response): Promise<Response> {
    const student_id = Number(req.params.student_id);

    SubjectRequest.isTokenOwner(student_id, req);

    const service = container.resolve(SubjectsService);
    const result = await service.findByStudent(student_id);

    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);

    const service = container.resolve(SubjectsService);
    const result = await service.update(id, req.body);

    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);
    SubjectRequest.isTokenOwner(id, req);

    const service = container.resolve(SubjectsService);
    const result = await service.delete(id);

    return res.json(result);
  }

}
