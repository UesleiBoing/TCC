import { Request } from 'express';

import IPaginationQuery from '@shared/interfaces/pagination/IPaginationQuery';

/**
 * @class Pagination - Class to handle pagination.
 */
export default class Pagination {

  /**
   * Receive request and return a object with pagination data.
   * Pagination object has the following structure:
   *
   */
  constructor(req: Request) {
    let { page, take } = req.query as unknown as IPaginationQuery;

    this.page = page as string || '1';
    this.take = take as string || '50';
  }

  page: string;

  take: string;

  /**
   * {
   *  take: how many items to return,
   *  skip: how many items to skip
   * }
   * @param req - Express Request
   * @returns Pagination object.
   */
  info() {
    return {
      take: Number(this.take),
      skip: this.page ? (Number(this.page) - 1) * Number(this.take) : 0,
    };
  }

}
