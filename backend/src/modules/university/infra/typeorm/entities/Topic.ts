import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import Field from '@shared/core/Field';
import Model from '@shared/infra/typeorm/model/Model';
import IFields from '@shared/interfaces/fields/IFields';

import Classe from './Classe';

@Entity('topics')
export default class Topic extends Model {

  @Column({ type: 'varchar', length: 80 })
    description: string;

  @Column({ type: 'integer' })
    order: number;

  @ManyToOne(() => Classe)
  @JoinColumn({ name: 'class_id' })
    subject: Classe;

  public static fields:IFields = {
    id:          { type: Field.TYPE_NUMBER },
    description: { type: Field.TYPE_STRING },
    order:       { type: Field.TYPE_NUMBER },
  };

}
