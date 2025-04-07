import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Headquarter } from '../../headquarter/entity/Headquarter';
import { State } from '../../state/entity/State';

@Entity()
export class Auction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 45 })
    name: string;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    crane_rate: number;

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
    updated_at: Date;

    @ManyToOne(() => State)
    @JoinColumn({ name: 'state_id' })
    state: State;

    @ManyToOne(() => Headquarter)
    @JoinColumn({ name: 'headquarter_id' })
    headquarter: Headquarter;
}
