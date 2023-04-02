import Classe from '../infra/typeorm/entities/Classe';

export default interface ITopicDTO {
  id?: number;
  description: string;
  order: number;

  class?: Classe;
  class_id: number;
}
