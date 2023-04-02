import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import Field from '@shared/core/Field';
import Model from '@shared/infra/typeorm/model/Model';
import IFields from '@shared/interfaces/fields/IFields';

import Topic from '@modules/university/infra/typeorm/entities/Topic';

@Entity('forms')
export default class Form extends Model {

  @Column({ type: 'varchar', length: 80 })
    title: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
    description: string;

  @Column({ type: 'integer' })
    order: number;

  @ManyToOne(() => Topic)
  @JoinColumn({ name: 'topic_id' })
    topic: Topic;

  public static fields:IFields = {
    id:       { type: Field.TYPE_NUMBER },
    title:    { type: Field.TYPE_STRING },
    description:  { type: Field.TYPE_STRING },
    order:  { type: Field.TYPE_NUMBER },
  };

}
