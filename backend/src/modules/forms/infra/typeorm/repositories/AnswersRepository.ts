import { Not, Repository as TypeORMRepository, getRepository } from 'typeorm';

import Repository from '@shared/infra/typeorm/repositories/Repository';

import IAnswersRepository from '@modules/forms/repositories/IAnswersRepository';

import IAnswerDTO from '../../../dtos/IAnswerDTO';
import Answer from '../entities/Answer';

export default class AnswersRepository extends Repository implements IAnswersRepository {

  protected ormRepository: TypeORMRepository<Answer>;

  constructor() {
    super();
    this.ormRepository = getRepository(Answer);
  }

  public build(user: IAnswerDTO): Answer {
    return super.build(user);
  }

  public async create(data: IAnswerDTO): Promise<Answer> {
    return super.create(data);
  }

  public async update(id: number, user: IAnswerDTO): Promise<Answer> {
    return super.update(id, user);
  }

  public async findOne(id: number | object, data: object = {}): Promise<Answer> {
    return super.findOne(id, data);
  }

  public async find(data: object = {}): Promise<Answer[]> {
    return super.find(data);
  }

  public async findOneFullData(id: number, data: object = {}): Promise<Answer | undefined> {
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
