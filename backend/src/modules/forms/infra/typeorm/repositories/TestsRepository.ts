import { Not, Repository as TypeORMRepository, getRepository } from 'typeorm';

import Repository from '@shared/infra/typeorm/repositories/Repository';

import ITestsRepository from '@modules/forms/repositories/ITestsRepository';

import ITestDTO from '../../../dtos/ITestDTO';
import Test from '../entities/Test';

export default class TestsRepository extends Repository implements ITestsRepository {

  protected ormRepository: TypeORMRepository<Test>;

  constructor() {
    super();
    this.ormRepository = getRepository(Test);
  }

  public build(user: ITestDTO): Test {
    return super.build(user);
  }

  public async create(data: ITestDTO): Promise<Test> {
    return super.create(data);
  }

  public async update(id: number, user: ITestDTO): Promise<Test> {
    return super.update(id, user);
  }

  public async findOne(id: number | object, data: object = {}): Promise<Test> {
    return super.findOne(id, data);
  }

  public async find(data: object = {}): Promise<Test[]> {
    return super.find(data);
  }

  public async findOneFullData(id: number, data: object = {}): Promise<Test | undefined> {
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
