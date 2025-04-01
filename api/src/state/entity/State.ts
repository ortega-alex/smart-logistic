import { Auction } from '../../auction/entity/Auction';
import { Sede } from '../../sede/entity/Sede';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// Estados de EEUU
@Entity()
export class State extends BaseEntity {
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

    @OneToMany(() => Sede, sede => sede.state, { cascade: true })
    sedes: Sede[];

    @OneToMany(() => Auction, auction => auction.state, { cascade: true })
    auctions: Auction[];
}
