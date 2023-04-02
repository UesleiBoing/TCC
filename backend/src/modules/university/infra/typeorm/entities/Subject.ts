import { Column, Entity } from 'typeorm';

import Field from '@shared/core/Field';
import Model from '@shared/infra/typeorm/model/Model';
import IFields from '@shared/interfaces/fields/IFields';

@Entity('subjects')
export default class Subject extends Model {

  @Column({ type: 'varchar', length: 80, unique: true })
    title: string;

  @Column({ type: 'varchar', length: 80 })
    content: string;

  public static fields:IFields = {
    id:       { type: Field.TYPE_NUMBER },
    title:    { type: Field.TYPE_STRING },
    content:  { type: Field.TYPE_STRING },
  };

}
