import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import Field from '@shared/core/Field';
import Model from '@shared/infra/typeorm/model/Model';
import IFields from '@shared/interfaces/fields/IFields';

import Form from './Form';

@Entity('questions')
export default class Question extends Model {

  @Column({ type: 'varchar', length: 80 })
    description: string;

  @Column({ type: 'integer', default: 0 })
    type: number;

  @Column({
    type: 'numeric', default: 1, precision: 3, scale: 2,
  })
    weight: number;

  @Column({ type: 'varchar', nullable: false })
    photo: string;

  @Column({ type: 'varchar', nullable: false })
    correct_answer: string;

  @ManyToOne(() => Form)
  @JoinColumn({ name: 'form_id' })
    form: Form;

  public static fields:IFields = {
    id:             { type: Field.TYPE_NUMBER },
    description:    { type: Field.TYPE_STRING },
    type:           { type: Field.TYPE_STRING },
    weight:         { type: Field.TYPE_STRING },
    photo:          { type: Field.TYPE_STRING },
    correct_answer: { type: Field.TYPE_STRING },
  };

}
