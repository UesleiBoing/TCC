import {
  DeleteResult, ILike, LessThan, LessThanOrEqual, Like, MoreThan,
  MoreThanOrEqual, Not, Repository as TypeORMRepository,
} from 'typeorm';

import IFullDataPagination from '@shared/interfaces/pagination/IFullDataPagination';
import IWhereTypeORM from '@shared/interfaces/typeorm/IWhereTypeORM';

import Config from './Config';

/**
 * @class Repositoy TypeORM- Repository of TypeORM.
 */
export default abstract class Repository {

  /**
   * Property of TypeORM repository.
   */
  protected ormRepository: TypeORMRepository<any>;

  /**
   * Build an istance of entity.
   * @param data - Data to build.
   * @returns Entity instance.
   */
  public build(data:any): any {
    return this.ormRepository.create(data);
  }

  public async save(data:any): Promise<any> {
    return this.ormRepository.save(data);
  }

  /**
   * Create a register on database.
   * @param data - Data to create.
   * @returns Entity created.
   */
  public async create(data:any): Promise<any> {
    const result = this.ormRepository.create(data);

    await this.ormRepository.save(result, Config.INSERT);

    return result;
  }

  /**
   * Update register on database;
   * @param id - ID of entity.
   * @param data - Data to update.
   * @returns Register updated.
   */
  public async update(id: number, data: any): Promise<any> {
    await this.ormRepository.update(id, data);

    return this.ormRepository.create({ id, ...data });
  }

  /**
   * Delete register on database.
   * @param conditions - Conditions to delete.
   * @returns Delete result.
   */
  public async delete(conditions: number | object | number[]): Promise<DeleteResult> {
    return await this.ormRepository.delete(conditions);
  }

  /**
   * Find first register on database.
   * @param id - ID of entity.
   * @param data - Data to conditions
   * @returns Entity found.
   */
  public async findOne(id: number | object, data: object = {}): Promise<any> {
    return await this.ormRepository.findOne(id, data);
  }

  /**
   * Find all registers on database.
   * @param data - Conditions to find.
   * @returns Array of entities.
   */
  public async find(data: object = { order: { id: 'ASC' } }): Promise<any[]> {
    return await this.ormRepository.find(data);
  }

  /**
   * Find registers on database with pagination and filtered.
   * @param data - Pagination and filter data.
   * @returns Array[0] - Array of entities. Array[1] - Total of registers.
   */
  public async findPagination({ pag, filter }:IFullDataPagination): Promise<[any[], number]> {
    return await this.ormRepository.findAndCount({
      where: filter,
      order: { id: 'ASC' },
      ...pag,
    });
  }

  /**
   * Method to execute queries of validation on create.
   * @param data - Data to validate.
   */
  public async findCreateValidation(data:any): Promise<any> {
    // do nothing
  }

  /**
   * Method to execute queries of validation on update.
   * @param data - Data to validate.
   */
  public async findUpdateValidation(data:any): Promise<any> {
    // do nothing
  }

  /**
   * Build where of TypeORM.
   * @param key - Key of where.
   * @param val - Value of where.
   * @returns Where object of TypeORM.
   */
  public static optionalWhere(key:string, val:string): IWhereTypeORM {
    return { [key]: val };
  }

  /**
   * Build where not of TypeORM.
   * @param key - Key of where.
   * @param val - Value of where.
   * @returns Where object of TypeORM.
   */
  public static optionalWhereNot(key:string, val:string): IWhereTypeORM {
    return { [key]: Not(val) };
  }

  /**
   * Build where like of TypeORM.
   * @param key - Key of where.
   * @param val - Value of where.
   * @returns Where object of TypeORM.
   */
  public static optionalWhereLike(key:string, val:string): IWhereTypeORM {
    return { [key]: Like(`%${val}%`) };
  }

  /**
   * Build where ilike of TypeORM.
   * @param key - Key of where.
   * @param val - Value of where.
   * @returns Where object of TypeORM.
   */
  public static optionalWhereILike(key:string, val:string): IWhereTypeORM {
    return { [key]: ILike(`%${val}%`) };
  }

  /**
   * Build where more than of TypeORM.
   * @param key - Key of where.
   * @param val - Value of where.
   * @returns Where object of TypeORM.
   */
  public static optionalWhereMoreThan(key:string, val:string): IWhereTypeORM {
    return { [key]: MoreThan(val) };
  }

  /**
   * Build where more than or equal of TypeORM.
   * @param key - Key of where.
   * @param val - Value of where.
   * @returns Where object of TypeORM.
   */
  public static optionalWhereMoreThanOrEqual(key:string, val:string): IWhereTypeORM {
    return { [key]: MoreThanOrEqual(val) };
  }

  /**
   * Build where less than of TypeORM.
   * @param key - Key of where.
   * @param val - Value of where.
   * @returns Where object of TypeORM.
   */
  public static optionalWhereLessThan(key:string, val:string): IWhereTypeORM {
    return { [key]: LessThan(val) };
  }

  /**
   * Build where less than or equal of TypeORM.
   * @param key - Key of where.
   * @param val - Value of where.
   * @returns Where object of TypeORM.
   */
  public static optionalWhereLessThanOrEqual(key:string, val:string): IWhereTypeORM {
    return { [key]: LessThanOrEqual(val) };
  }

  public async lastOrder(conditions: {}): Promise<number> {
    const result = await this.ormRepository.find({
      where: conditions,
      order: {
        order: 'DESC',
      },
      take: 1,
    });

    return result.length > 0 ? result[0].order : 0;
  }

}
