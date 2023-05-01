import { Request, Response } from 'express';
import { container } from 'tsyringe';

import Controller from '@shared/core/Controller';

import FormsService from '@modules/forms/services/FormsService';

import FormRequest from '../requests/FormRequest';

export default class FormsController extends Controller {

  public async create(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(FormsService);
    const result = await service.create(req.body);

    return res.status(200).json(result);
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(FormsService);
    const result = await service.findAll();

    return res.status(200).json(result);
  }

  public async findOne(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);

    const service = container.resolve(FormsService);

    const result = await service.findById(id, {
      questions: req.query.questions as string | undefined,
      answers: req.query.answers as string | undefined,
    });

    return res.status(200).json(result);
  }

  public async findByTopic(req: Request, res: Response): Promise<Response> {

    const service = container.resolve(FormsService);
    const topic_id = req.params.topic_id as string | undefined;

    const result = await service.findByTopic({
      topic_id: Number(topic_id),
    });

    return res.status(200).json(result);
  }

  public async generate(req: Request, res: Response): Promise<Response> {

    const service = container.resolve(FormsService);

    const result = await service.generate(req.body);

    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);

    FormRequest.isTokenOwner(id, req);

    const service = container.resolve(FormsService);
    const result = await service.update(id, req.body);

    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);
    FormRequest.isTokenOwner(id, req);

    const service = container.resolve(FormsService);
    const result = await service.delete(id);

    return res.json(result);
  }

}
