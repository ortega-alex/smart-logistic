import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Auction } from '../../auction/entity/Auction';
import { Headquarter } from '../../headquarter/entity/Headquarter';

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

    @OneToMany(() => Headquarter, headquarter => headquarter.state, { cascade: true })
    headquarters: Headquarter[];

    @OneToMany(() => Auction, auction => auction.state, { cascade: true })
    auctions: Auction[];
}
