import { Not, Repository as TypeORMRepository, getRepository } from 'typeorm';

import Repository from '@shared/infra/typeorm/repositories/Repository';

import IClassesRepository from '@modules/university/repositories/IClassesRepository';

import IClassDTO from '../../../dtos/IClassDTO';
import Classe from '../entities/Classe';

export default class ClassesRepository extends Repository implements IClassesRepository {

  protected ormRepository: TypeORMRepository<Classe>;

  constructor() {
    super();
    this.ormRepository = getRepository(Classe);
  }

  public build(user: IClassDTO): Classe {
    return super.build(user);
  }

  public async create(data: IClassDTO): Promise<Classe> {
    return super.create(data);
  }

  public async update(id: number, user: IClassDTO): Promise<Classe> {
    return super.update(id, user);
  }

  public async findOne(id: number | object, data: object = {}): Promise<Classe> {
    return super.findOne(id, data);
  }

  public async find(data: object = {}): Promise<Classe[]> {
    return super.find(data);
  }

  public async findOneFullData(id: number, data: object = {}): Promise<Classe | undefined> {
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
