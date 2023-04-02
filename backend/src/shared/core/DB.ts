import { getConnection } from 'typeorm';

export default class DB {

  // public static async begin(connection)
  // {
  //     return await connection.query('BEGIN;');
  // }

  // public static async commit(connection)
  // {
  //     return await connection.query('END;');
  // }

  // public static async rollback(connection)
  // {
  //     return await connection.query('ROLLBACK;');
  // }

  public static async begin(): Promise<void> {
    return getConnection().query('BEGIN;');
  }

  public static async commit(): Promise<void> {
    return getConnection().query('END;');
  }

  public static async rollback(): Promise<void> {
    return getConnection().query('ROLLBACK;');
  }

}
