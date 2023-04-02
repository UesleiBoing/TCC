import { Not, Repository as TypeORMRepository, getRepository } from 'typeorm';

import Repository from '@shared/infra/typeorm/repositories/Repository';

import IStudentsRepository from '@modules/users/repositories/IStudentsRepository';

import IStudentDTO from '../../../dtos/IStudentDTO';
import Student from '../entities/Student';

export default class StudentsRepository extends Repository implements IStudentsRepository {

  protected ormRepository: TypeORMRepository<Student>;

  constructor() {
    super();
    this.ormRepository = getRepository(Student);
  }

  public build(user: IStudentDTO): Student {
    return super.build(user);
  }

  public async create(data: IStudentDTO): Promise<Student> {
    return super.create(data);
  }

  public async update(id: number, user: IStudentDTO): Promise<Student> {
    return super.update(id, user);
  }

  public async findOne(id: number | object, data: object = {}): Promise<Student> {
    return super.findOne(id, data);
  }

  public async find(data: object = {}): Promise<Student[]> {
    return super.find(data);
  }

  public async findByEmail(email: string): Promise<Student | undefined> {
    return this.ormRepository.findOne({ email });
  }

  public async findCreateValidation({ email }: IStudentDTO): Promise<Student | undefined> {
    return this.ormRepository.findOne({
      where: [
        { email },
      ],
    });
  }

  public async findUpdateValidation({ id, email }: IStudentDTO): Promise<Student | undefined> {
    return this.ormRepository.findOne({
      where: [
        { id },
        { id: Not(id), email },
      ],
    });
  }

  public async findOneFullData(id: number, data: object = {}): Promise<Student | undefined> {
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

  public async findToLogin(email: string): Promise<Student | undefined> {
    return this.ormRepository.findOne({
      select: ['id', 'name', 'email', 'password'],
      where: { email },
    });
  }

}
