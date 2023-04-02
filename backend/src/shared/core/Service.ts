import { Request } from 'express';
import { Not } from 'typeorm';

import ValidationHelper from '@shared/helpers/ValidationHelper';

import Field from './Field';
import ModelCore from './ModelCore';
import OptionalParameters from './OptionalParameters';
import Pagination from './Pagination';
import RequestCore from './Request';

/**
 * @class Service core - Class to abstract
 */
export default abstract class Service {

  /**
   * Property to be ORM Repository.
   */
  protected repository: any;

  /**
   * Property to be ORM Entity.
   */
  public entity: ModelCore;

  /**
   * Property to be Request.
   */
  public request: RequestCore;

  /**
   * Create method to insert elements from database.
   * @param data - data to validate.
   * @returns element created.
   */
  public async create(data: object): Promise<any> {
    await (this.request as typeof RequestCore).create(data);

    return await this.repository.create(data);
  }

  public build(data: { [key: string]: any }): any {
    let newData: { [key: string]: any } = {};
    const { fields } = this.entity as typeof ModelCore;

    Object.keys(fields).forEach((key) => {
      if (data[key]) {
        newData[key] = data[key];
      }
    });

    return newData;
  }

  /**
   * Update method to update elements from database.
   * @param id - id to find element.
   * @param data - data to validate.
   * @returns element updated.
   */
  public async update(id: number, data: object): Promise<any> {
    await (this.request as typeof RequestCore).update({ id, ...data });

    return await this.repository.update(id, data);
  }

  /**
   * Delete method to remove elements from database.
   * @param id - Id to validate.
   * @returns Number of deleted registers.
   */
  public async delete(id: number | number[] | object): Promise<any> {
    const deleted = await this.repository.delete(id);

    return deleted.affected;
  }

  /**
   * First element from database based on id.
   * @param id - Id to validate.
   * @param data - Additional data to find
   * @returns Return first element from database as TypeORM entity.
   */
  public async findOne(id: number | object, data: object = {}): Promise<any> {
    return await this.repository.findOne(id, data);
  }

  /**
   * Find all elements from database.
   * @param data - Data to validate.
   * @returns Array of elements as TypeORM entity.
   */
  public async find(data: object = { order: { id: 'ASC' } }): Promise<any> {
    return await this.repository.find(data);
  }

  /**
   * Pagination method which will return paginated elements.
   * @param model - Model to be found.
   * @param req - Request of express.
   * @returns Object which has total property registers on database,
   * and data property which has the found elements.
   */
  public async findPagination(req: Request): Promise<any> {
    const pag = new Pagination(req).info();
    const filter = new OptionalParameters(
      req,
      this.entity as typeof ModelCore,
    ).filter();

    const [array, total] = await this.repository.findPagination({ pag, filter });

    return { total, data: array };
  }

  /**
   * Method to remove mask from object.
   * @param data - Data request.
   * @returns Data with no mask,
   */
  public removeMask(data: any): object {
    const maskedElements = Field.getMaskeds(this.entity);
    const { fields } = this.entity as typeof ModelCore;

    maskedElements.forEach((element: string) => {
      if (fields[element].mask === Field.MASK_ONLY_NUMBERS) {
        data[element] = ValidationHelper.getOnlyNumbers(data[element]);
      } else if (fields[element].mask === Field.TYPE_STRING) {
        data[element] = ValidationHelper.getOnlyLetters(data[element]);
      }
    });

    return data;
  }

  public transformToRelationsArray(arr: any[], T: any = false): typeof T[] {
    return arr.map((id: string | number) => ({
      id: Number(id),
    }));
  }

  public async getOrderAnd(
    { id, ...data }: { id?: string; [key: string]: any },
  ): Promise<number> {
    if (Number.isNaN(data.order)) {
      return (await this.repository.lastOrder(data)) + 1;
    }

    let params = data;
    if (id) {
      params = { ...data, id: Not(id) };
    }

    const registers = await this.repository.find({
      where: params,
    });

    if (registers.length === 0) {
      return data.order;
    }

    return (await this.repository.lastOrder(data)) + 1;
  }

}
