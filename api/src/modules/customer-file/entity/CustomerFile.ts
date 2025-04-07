import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../../customer/entity/Customer';

@Entity()
export class CustomerFile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 100 })
    name: string;

    @Column('varchar', { length: 200 })
    path: string;

    @Column({ default: true })
    is_active: boolean;

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

    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'id_customer' })
    customer: Customer;
}
