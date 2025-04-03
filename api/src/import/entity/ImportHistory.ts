import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from '../../vehicle/entity/Vehicle';
import { ImportState } from './ImportState';
import { User } from '../../user/entity/User';
import { Customer } from '../../customer/entity/Customer';

@Entity()
export class ImportHistory extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 300 })
    description: string;

    @Column('varchar', { length: 300 })
    path: string;

    @Column({ default: false })
    is_visible_customer: boolean;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    edited_at: Date;

    @ManyToOne(() => Vehicle, { nullable: false })
    @JoinColumn({ name: 'vehicle_id' })
    vehicle: Vehicle;

    @ManyToOne(() => ImportState, { nullable: false })
    @JoinColumn({ name: 'import_state_id' })
    importState: ImportState;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Customer, { nullable: true })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;
}
