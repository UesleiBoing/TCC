import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import ModelCore from '@shared/core/ModelCore';

/**
 * @class Model - TypeORM model with ID, created_at and updated_at. .
 */
export default abstract class Model extends ModelCore {

  @PrimaryGeneratedColumn('increment')
    id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', select: false })
    created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', select: false })
    updated_at: Date;

}
