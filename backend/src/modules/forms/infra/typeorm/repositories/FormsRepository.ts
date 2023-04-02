import { Not, Repository as TypeORMRepository, getRepository } from 'typeorm';

import Repository from '@shared/infra/typeorm/repositories/Repository';

import IFormsRepository from '@modules/forms/repositories/IFormsRepository';

import IFormDTO from '../../../dtos/IFormDTO';
import Form from '../entities/Form';

export default class FormsRepository extends Repository implements IFormsRepository {

  protected ormRepository: TypeORMRepository<Form>;

  constructor() {
    super();
    this.ormRepository = getRepository(Form);
  }

  public build(user: IFormDTO): Form {
    return super.build(user);
  }

  public async create(data: IFormDTO): Promise<Form> {
    return super.create(data);
  }

  public async update(id: number, user: IFormDTO): Promise<Form> {
    return super.update(id, user);
  }

  public async findOne(id: number | object, data: object = {}): Promise<Form> {
    return super.findOne(id, data);
  }

  public async find(data: object = {}): Promise<Form[]> {
    return super.find(data);
  }

  public async findOneFullData(id: number, data: object = {}): Promise<Form | undefined> {
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
