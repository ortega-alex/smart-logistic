import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Coin } from '../interface/Quoter';
import { Quoter } from './Quoter';

@Entity()
export class QuoterDetail extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 45 })
    name: string;

    @Column('decimal', { precision: 10, scale: 2 })
    value: number;

    @Column({
        type: 'enum',
        enum: Coin,
        default: Coin.USD
    })
    coin: Coin;

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

    @ManyToOne(() => Quoter)
    @JoinColumn({ name: 'quoter_id' })
    quoter: Quoter;
}
