import { FindOperator } from 'typeorm';

export default interface IWhereTypeORM {
  [x: string]: FindOperator<string> | string;
}
