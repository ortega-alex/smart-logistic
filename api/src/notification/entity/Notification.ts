import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../../customer/entity/Customer';
import { User } from '../../user/entity/User';
import { NotificationPriority } from '../interface/Notification';

@Entity()
export class Notification extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 100 })
    title: string;

    @Column('text')
    description: string;

    @Column('varchar', { length: 45, nullable: true })
    path: string | null;

    @Column({
        type: 'enum',
        enum: NotificationPriority,
        default: NotificationPriority.LOW
    })
    priority: NotificationPriority;

    @Column({ default: false })
    seen: boolean;

    @Column({ default: true })
    is_active: boolean;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at: Date;

    @ManyToOne(() => Customer, { nullable: true })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer | null;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: User | null;
}
