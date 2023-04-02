import { Not, Repository as TypeORMRepository, getRepository } from 'typeorm';

import Repository from '@shared/infra/typeorm/repositories/Repository';

import ITopicsRepository from '@modules/university/repositories/ITopicsRepository';

import ITopicDTO from '../../../dtos/ITopicDTO';
import Topic from '../entities/Topic';

export default class TopicsRepository
  extends Repository
  implements ITopicsRepository {

  protected ormRepository: TypeORMRepository<Topic>;

  constructor() {
    super();
    this.ormRepository = getRepository(Topic);
  }

  public build(user: ITopicDTO): Topic {
    return super.build(user);
  }

  public async create(data: ITopicDTO): Promise<Topic> {
    return super.create(data);
  }

  public async update(id: number, user: ITopicDTO): Promise<Topic> {
    return super.update(id, user);
  }

  public async findOne(id: number | object, data: object = {}): Promise<Topic> {
    return super.findOne(id, data);
  }

  public async find(data: object = {}): Promise<Topic[]> {
    return super.find(data);
  }

  public async findOneFullData(
    id: number,
    data: object = {},
  ): Promise<Topic | undefined> {
    return this.ormRepository.findOne(id, {
      relations: [
      ],
    });
  }

  public async findCreateValidation({
    order,
    class_id,
  }: any): Promise<Topic | undefined> {
    return this.ormRepository.findOne({
      where: [
        { class_id, order },
      ],
    });
  }

  public async findUpdateValidation({
    id,
    class_id,
    order,
  }: ITopicDTO): Promise<Topic | undefined> {
    return this.ormRepository.findOne({
      where: [
        { class_id, order, id: Not(id) },
      ],
    });
  }

  public async lastOrder(class_id: number): Promise<number> {
    const result = await this.ormRepository.find({
      where: [
        { class_id },
      ],
      order: {
        order: 'DESC',
      },
      take: 1,
    });

    return result.length > 0 ? result[0].order : 0;
  }

}
