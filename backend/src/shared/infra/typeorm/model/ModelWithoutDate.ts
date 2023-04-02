import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import ModelCore from '@shared/core/ModelCore';

/**
 * @class MordelWithoutDate - TypeORM model with ID.
 */
export default abstract class ModelWithoutDate extends ModelCore {

  @PrimaryGeneratedColumn('increment')
    id: number;

}
