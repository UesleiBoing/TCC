import { Request, Response } from 'express';
import { container } from 'tsyringe';

import Controller from '@shared/core/Controller';

import QuestionsService from '@modules/forms/services/QuestionsService';

import QuestionRequest from '../requests/QuestionRequest';

export default class QuestionsController extends Controller {

  public async create(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(QuestionsService);
    const result = await service.create(req.body);

    return res.status(200).json(result);
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(QuestionsService);
    const result = await service.findPagination(req);

    return res.status(200).json(result);
  }

  public async findOne(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);

    const service = container.resolve(QuestionsService);
    const result = await service.findOneFullData(id);

    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);

    QuestionRequest.isTokenOwner(id, req);

    const service = container.resolve(QuestionsService);
    const result = await service.update(id, req.body);

    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);
    QuestionRequest.isTokenOwner(id, req);

    const service = container.resolve(QuestionsService);
    const result = await service.delete(id);

    return res.json(result);
  }

}
