import { Request, Response } from 'express';
import { container } from 'tsyringe';

import Controller from '@shared/core/Controller';
import AppError from '@shared/errors/AppError';

import FormsService from '@modules/forms/services/FormsService';
import QuestionsService from '@modules/forms/services/QuestionsService';
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
    const result = await service.findAll();

    return res.status(200).json(result);
  }

  public async findOne(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);

    const service = container.resolve(TopicsService);
    const result = await service.findById(id);

    return res.status(200).json(result);
  }

  public async findKeywords(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);

    const service = container.resolve(TopicsService);
    const result = await service.findKeywords(id);

    return res.status(200).json(result);
  }

  public async findQuestions(req: Request, res: Response): Promise<Response> {
    const topic_id = super.getIdParam(req);

    const service = container.resolve(QuestionsService);
    const result = await service.findByTopic(topic_id);

    return res.status(200).json(result);
  }

  public async findByStudent(req: Request, res: Response): Promise<Response> {
    const student_id = Number(req.params.student_id);

    TopicRequest.isTokenOwner(student_id, req);

    const service = container.resolve(TopicsService);
    const result = await service.findByStudent(student_id);

    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);

    const service = container.resolve(TopicsService);
    const result = await service.update(id, req.body);

    return res.status(200).json(result);
  }

  public async updateStandardForm(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);

    const topicService = container.resolve(TopicsService);
    const formService = container.resolve(FormsService);

    const topic = await topicService.findById(id);

    if (!topic) {
      throw new AppError('Topic not found');
    }

    if (!topic.forms[0].id) {
      throw new AppError('Topic has no form');
    }

    const form = await formService.update(topic.forms[0].id, req.body);

    return res.status(200).json({
      topic,
      form,
    });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const id = super.getIdParam(req);

    const service = container.resolve(TopicsService);
    const result = await service.delete(id);

    return res.json(result);
  }

}
