import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../../customer/entity/Customer';
import { TransportRate } from '../../transport-rate/entity/TransportRate';

@Entity()
export class CustomerType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 45 })
    name: string;

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

    @OneToMany(() => Customer, customer => customer.type, { cascade: true })
    customers: Customer[];

    @OneToMany(() => TransportRate, transportRate => transportRate.customerType, { cascade: true })
    transportRates: TransportRate[];
}
