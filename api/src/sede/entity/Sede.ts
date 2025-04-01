import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Municipality } from '../../municipality/entity/Municipality';
import { State } from '../../state/entity/State';
import { TransportRate } from '../../transport-rate/entity/TransportRate';
import { Auction } from '../../auction/entity/Auction';

@Entity()
export class Sede extends BaseEntity {
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

    @ManyToOne(() => Municipality, { nullable: true })
    @JoinColumn({ name: 'municipality_id' })
    municipality: Municipality;

    @ManyToOne(() => State, { nullable: true })
    @JoinColumn({ name: 'state_id' })
    state: State;

    @OneToMany(() => TransportRate, transportRate => transportRate.sede, { cascade: true })
    transportRates: TransportRate[];

    @OneToMany(() => Auction, auction => auction.sede, { cascade: true })
    auctions: Auction[];
}
