import { Prisma } from '@prisma/client';

interface getOrderHandledProps {
  extraConditions?: object;
  id?: number;
  order?: number;
}

/**
 * @class Service core - Class to abstract
 */
export default abstract class Service {

  client: any;

  /**
   * Method to remove mask from object.
   * @param data - Data request.
   * @returns Data with no mask,
   */
  public removeMask(data: any): object {
    // if (this.entity) {
    //   const maskedElements = Field.getMaskeds(this.entity);
    //   const { fields } = this.entity as typeof ModelCore;

    //   maskedElements.forEach((element: string) => {
    //     if (fields[element].mask === Field.MASK_ONLY_NUMBERS) {
    //       data[element] = ValidationHelper.getOnlyNumbers(data[element]);
    //     } else if (fields[element].mask === Field.TYPE_STRING) {
    //       data[element] = ValidationHelper.getOnlyLetters(data[element]);
    //     }
    //   });
    // }

    return data;
  }

  public async getOrderHandled({
    order,
    id,
    extraConditions = {},
  }: getOrderHandledProps): Promise<number> {
    const conditionAtUpdate = id === undefined ? {} : { NOT: { id } };

    // If it was given a number
    if (typeof order === 'number') {
      const exists = await this.client.findFirst({
        where: {
          order,
          ...conditionAtUpdate,
          ...extraConditions,
        },
      });

      // If the order doesnt exists, return the order
      if (!exists) {
        return order;
      }
    }

    // If it was given an id(it means its updating), and not was given a order
    if (id) {
      const actualRegister = await this.client.findFirst({
        where: {
          id,
        },
      });

      // Uses the actual order
      if (actualRegister) {
        return actualRegister.order;
      }

      // If the record doesnt exists, then throw anything because later it will throw a error
      return 0;
    }

    // Get the last order from the database
    const lastOrder = await this.client.findFirst({
      orderBy: {
        order: 'desc',
        ...extraConditions,
      },
    });

    return lastOrder ? lastOrder.order + 1 : 1;
  }

  public async findAll(data: object = {
    orderBy: {
      id: 'asc',
    },
  }) {
    const dataClient = await this.client.findMany({
      orderBy: {
        id: 'asc',
      },
      ...data,
    });

    return dataClient;
  }

}
