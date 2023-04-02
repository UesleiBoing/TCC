import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import Field from '@shared/core/Field';
import Model from '@shared/infra/typeorm/model/Model';
import IFields from '@shared/interfaces/fields/IFields';

import Student from '@modules/users/infra/typeorm/entities/Student';

import Form from './Form';

@Entity('tests')
export default class Test extends Model {

  @Column({ type: 'numeric', precision: 4, scale: 2 })
    grade: number;

  @ManyToOne(() => Form)
  @JoinColumn({ name: 'form_id' })
    form: Form;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
    student: Student;

  public static fields:IFields = {
    id:       { type: Field.TYPE_NUMBER },
    grade:    { type: Field.TYPE_NUMBER },
  };

}
