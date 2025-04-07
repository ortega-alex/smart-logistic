import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Auction } from '../../auction/entity/Auction';
import { Department } from '../../department/entity/Department';
import { State } from '../../state/entity/State';
import { TransportRate } from '../../transport-rate/entity/TransportRate';
import { User } from '../../user/entity/User';

// sedes de Guatemala y EEUU
@Entity()
export class Headquarter extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 45 })
    name: string;

    @Column('text', { nullable: true })
    address: string;

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

    @ManyToOne(() => Department, { nullable: true })
    @JoinColumn({ name: 'department_id' })
    department: Department;

    @ManyToOne(() => State, { nullable: true })
    @JoinColumn({ name: 'state_id' })
    state: State;

    @OneToMany(() => TransportRate, transportRate => transportRate.headquarter, { cascade: true })
    transportRates: TransportRate[];

    @OneToMany(() => Auction, auction => auction.headquarter, { cascade: true })
    auctions: Auction[];

    @OneToMany(() => User, quoter => quoter.headquarter, { cascade: true })
    users: User[];
}
