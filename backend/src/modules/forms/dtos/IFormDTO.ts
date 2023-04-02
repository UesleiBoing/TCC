import Topic from '@modules/university/infra/typeorm/entities/Topic';

export default interface IFormDTO {
  id?: number;
  title: string;
  description: string;
  order: number;

  topic_id: number;
  topic?: Topic;
}
