import { Request, Response } from 'express';
import { container } from 'tsyringe';

import Controller from '@shared/core/Controller';

import TopicsService from '@modules/university/services/TopicsService';

import TopicRequest from '../requests/TopicRequest';

export default class TopicsController extends Controller {

  public async create(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(TopicsService);
    const result = await service.create(req.body);

    return res.status(200).json(result);
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(TopicsService);
    const result = await service.findPagination(req);

    return res.status(200).json(result);
  }

  public async findOne(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);

    const service = container.resolve(TopicsService);
    const result = await service.findOneFullData(id);

    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);

    TopicRequest.isTokenOwner(id, req);

    const service = container.resolve(TopicsService);
    const result = await service.update(id, req.body);

    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);
    TopicRequest.isTokenOwner(id, req);

    const service = container.resolve(TopicsService);
    const result = await service.delete(id);

    return res.json(result);
  }

}
