import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../../customer/entity/Customer';
import { User } from '../../user/entity/User';
import { OrderPaperStatus } from './OrderPaperStatus';

@Entity()
export class OrderPaper extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 45 })
    title: string;

    @Column('text')
    description: string;

    @Column({ default: true })
    is_active: boolean;

    @Column({ type: 'timestamp' })
    date: Date;

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

    @ManyToOne(() => OrderPaperStatus, { nullable: false })
    @JoinColumn({ name: 'status_id' })
    status: OrderPaperStatus;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Customer, { nullable: true })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;
}
