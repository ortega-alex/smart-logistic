import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AppointmentStatus extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 45 })
    name: string;

    @Column('varchar', { length: 7 })
    color: string;

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
}
