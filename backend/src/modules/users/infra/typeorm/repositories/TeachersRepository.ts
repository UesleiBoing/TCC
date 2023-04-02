import { Not, Repository as TypeORMRepository, getRepository } from 'typeorm';

import Repository from '@shared/infra/typeorm/repositories/Repository';

import ITeachersRepository from '@modules/users/repositories/ITeachersRepository';

import ITeacherDTO from '../../../dtos/ITeacherDTO';
import Teacher from '../entities/Teacher';

export default class TeachersRepository extends Repository implements ITeachersRepository {

  protected ormRepository: TypeORMRepository<Teacher>;

  constructor() {
    super();
    this.ormRepository = getRepository(Teacher);
  }

  public build(user: ITeacherDTO): Teacher {
    return super.build(user);
  }

  public async create(data: ITeacherDTO): Promise<Teacher> {
    return super.create(data);
  }

  public async update(id: number, user: ITeacherDTO): Promise<Teacher> {
    return super.update(id, user);
  }

  public async findOne(id: number | object, data: object = {}): Promise<Teacher> {
    return super.findOne(id, data);
  }

  public async find(data: object = {}): Promise<Teacher[]> {
    return super.find(data);
  }

  public async findByEmail(email: string): Promise<Teacher | undefined> {
    return this.ormRepository.findOne({ email });
  }

  public async findCreateValidation({ email }: ITeacherDTO): Promise<Teacher | undefined> {
    return this.ormRepository.findOne({
      where: [
        { email },
      ],
    });
  }

  public async findUpdateValidation({ id, email }: ITeacherDTO): Promise<Teacher | undefined> {
    return this.ormRepository.findOne({
      where: [
        { id },
        { id: Not(id), email },
      ],
    });
  }

  public async findOneFullData(id: number, data: object = {}): Promise<Teacher | undefined> {
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

  public async findToLogin(email: string): Promise<Teacher | undefined> {
    return this.ormRepository.findOne({
      select: ['id', 'name', 'email', 'password'],
      where: { email },
    });
  }

}
