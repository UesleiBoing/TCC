import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import Field from '@shared/core/Field';
import Model from '@shared/infra/typeorm/model/Model';
import IFields from '@shared/interfaces/fields/IFields';

import Question from './Question';

@Entity('answers')
export default class Answer extends Model {

  @Column({ type: 'varchar', length: 80 })
    description: string;

  @Column({ type: 'varchar', nullable: false })
    photo: string;

  @ManyToOne(() => Question)
  @JoinColumn({ name: 'question_id' })
    question: Question;

  public static fields:IFields = {
    id:          { type: Field.TYPE_NUMBER },
    description: { type: Field.TYPE_STRING },
    photo:       { type: Field.TYPE_STRING },
  };

}
