import { Not, Repository as TypeORMRepository, getRepository } from 'typeorm';

import Repository from '@shared/infra/typeorm/repositories/Repository';

import IStudentAnswersRepository from '@modules/forms/repositories/IStudentAnswersRepository';

import IStudentAnswerDTO from '../../../dtos/IStudentAnswerDTO';
import StudentAnswer from '../entities/StudentAnswer';

export default class StudentAnswersRepository
  extends Repository
  implements IStudentAnswersRepository {

  protected ormRepository: TypeORMRepository<StudentAnswer>;

  constructor() {
    super();
    this.ormRepository = getRepository(StudentAnswer);
  }

  public build(user: IStudentAnswerDTO): StudentAnswer {
    return super.build(user);
  }

  public async create(data: IStudentAnswerDTO): Promise<StudentAnswer> {
    return super.create(data);
  }

  public async update(
    id: number,
    user: IStudentAnswerDTO,
  ): Promise<StudentAnswer> {
    return super.update(id, user);
  }

  public async findOne(
    id: number | object,
    data: object = {},
  ): Promise<StudentAnswer> {
    return super.findOne(id, data);
  }

  public async find(data: object = {}): Promise<StudentAnswer[]> {
    return super.find(data);
  }

  public async findOneFullData(
    id: number,
    data: object = {},
  ): Promise<StudentAnswer | undefined> {
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
