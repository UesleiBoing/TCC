import { Not, Repository as TypeORMRepository, getRepository } from 'typeorm';

import Repository from '@shared/infra/typeorm/repositories/Repository';

import IQuestionsRepository from '@modules/forms/repositories/IQuestionsRepository';

import IQuestionDTO from '../../../dtos/IQuestionDTO';
import Question from '../entities/Question';

export default class QuestionsRepository extends Repository implements IQuestionsRepository {

  protected ormRepository: TypeORMRepository<Question>;

  constructor() {
    super();
    this.ormRepository = getRepository(Question);
  }

  public build(user: IQuestionDTO): Question {
    return super.build(user);
  }

  public async create(data: IQuestionDTO): Promise<Question> {
    return super.create(data);
  }

  public async update(id: number, user: IQuestionDTO): Promise<Question> {
    return super.update(id, user);
  }

  public async findOne(id: number | object, data: object = {}): Promise<Question> {
    return super.findOne(id, data);
  }

  public async find(data: object = {}): Promise<Question[]> {
    return super.find(data);
  }

  public async findOneFullData(id: number, data: object = {}): Promise<Question | undefined> {
    return this.ormRepository.findOne(id, {
      relations: [
        'addresses',
        'telephones',
        'favoritePoints',
        'favoriteProducts',
        'addresses.city',
        'addresses.city.state',
        'addresses.city.state.country',
        'favoritePoints.address',
        'favoritePoints.address.city',
        'favoritePoints.address.city.state',
        'favoritePoints.address.city.state.country',
        'favoriteProducts.category',
        'favoriteProducts.brand',
        'favoriteProducts.type_product',
      ],
    });
  }

}
