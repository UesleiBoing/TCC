import {
  Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne,
} from 'typeorm';

import Field from '@shared/core/Field';
import Model from '@shared/infra/typeorm/model/Model';
import IFields from '@shared/interfaces/fields/IFields';

import Student from '@modules/users/infra/typeorm/entities/Student';
import Teacher from '@modules/users/infra/typeorm/entities/Teacher';

import Subject from './Subject';

@Entity('classes')
export default class Classe extends Model {

  @Column({ type: 'varchar', length: 80 })
    title: string;

  @Column({ type: 'varchar', length: 80 })
    content: string;

  @Column({ type: 'varchar', length: 4 })
    year: number;

  @Column({ type: 'varchar', length: 1 })
    semester: number;

  @Column({ type: 'integer' })
    teacher_id: number;

  @ManyToOne(() => Teacher)
  @JoinColumn({ name: 'teacher_id' })
    teacher: Teacher;

  @Column({ type: 'integer' })
    subject_id: number;

  @ManyToOne(() => Subject)
  @JoinColumn({ name: 'subject_id' })
    subject: Subject;

  @ManyToMany(() => Student, { eager: true })
  @JoinTable({
    name: 'classes_students',
    joinColumn: {
      name: 'class_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'student_id',
      referencedColumnName: 'id',
    },
  })
    students: Student[];

  public static fields:IFields = {
    id:       { type: Field.TYPE_NUMBER },
    title:    { type: Field.TYPE_STRING },
    content:  { type: Field.TYPE_STRING },
    year:     { type: Field.TYPE_NUMBER },
    semester: { type: Field.TYPE_NUMBER },
    teacher_id: { type: Field.TYPE_NUMBER },
    subject_id: { type: Field.TYPE_NUMBER },
  };

}
