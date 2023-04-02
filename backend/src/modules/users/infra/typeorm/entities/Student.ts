import { Column, Entity } from 'typeorm';

import Field from '@shared/core/Field';
import Model from '@shared/infra/typeorm/model/Model';
import IFields from '@shared/interfaces/fields/IFields';

@Entity('students')
export default class Student extends Model {

  @Column({ type: 'varchar', length: 80 })
    name: string;

  @Column({ type: 'varchar', unique: true })
    email: string;

  @Column({ type: 'varchar', select: false })
    password?: string;

  public static fields:IFields = {
    id:     { type: Field.TYPE_NUMBER },
    name:   { type: Field.TYPE_STRING },
    email:  { type: Field.TYPE_STRING },
  };

}
