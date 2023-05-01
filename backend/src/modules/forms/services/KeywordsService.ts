import { Keyword } from '@prisma/client';
import { injectable } from 'tsyringe';

import Service from '@shared/core/Service';
import client from '@shared/infra/prisma/client';

import KeywordRequest from '../infra/http/requests/KeywordRequest';

interface IRequest {
  description: string;
  topic_id: number;
}

@injectable()
export default class KeywordsService extends Service {

  client = client.keyword;

  public async findById(id: number) {
    const subject = await this.client.findFirst({ where: { id } });

    return subject;
  }

  public async findAll(data: object = {}) {
    const keywords = await super.findAll(data);

    return keywords;
  }

  public async create(data: IRequest): Promise<Keyword> {
    data = super.removeMask(data) as IRequest;

    let { description, topic_id } = data;

    await KeywordRequest.create({ description, topic_id });

    const keyword = await this.client.create({
      data: {
        description,
        topic_id,
      },
    });

    return keyword;
  }

  public async update(id: number, data: IRequest): Promise<Keyword> {
    data = super.removeMask(data) as IRequest;

    let { description, topic_id } = data;

    await KeywordRequest.update({ id, description, topic_id });

    const keyword = await this.client.update({
      data: {
        description,
        topic_id,
      },
      where: { id },
    });

    return keyword;
  }

  public async delete(id: number) {
    await KeywordRequest.delete({ id });

    const deleted = await this.client.delete({ where: { id } });

    return deleted;
  }

}
