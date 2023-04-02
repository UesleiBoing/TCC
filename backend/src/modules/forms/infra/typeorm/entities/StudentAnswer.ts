import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import Field from '@shared/core/Field';
import Model from '@shared/infra/typeorm/model/Model';
import IFields from '@shared/interfaces/fields/IFields';

import Question from './Question';
import Test from './Test';

@Entity('answers')
export default class StudentAnswer extends Model {

  @Column({ type: 'varchar', length: 300 })
    answer: string;

  @Column({
    type: 'numeric', default: 1, precision: 3, scale: 2,
  })
    status: number;

  @ManyToOne(() => Question)
  @JoinColumn({ name: 'question_id' })
    question: Question;

  @ManyToOne(() => Test)
  @JoinColumn({ name: 'test_id' })
    test: Test;

  public static fields:IFields = {
    id:     { type: Field.TYPE_NUMBER },
    answer: { type: Field.TYPE_STRING },
    status: { type: Field.TYPE_NUMBER },
  };

}
