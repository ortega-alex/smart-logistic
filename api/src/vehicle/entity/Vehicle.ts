import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Quoter } from '../../quoter/entity/Quoter';
import { ImportState } from '../../import/entity/ImportState';
import { ImportHistory } from '../../import/entity/ImportHistory';

@Entity()
export class Vehicle extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: true
    })
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
    edted_at: Date;

    @ManyToOne(() => Quoter, { nullable: false })
    @JoinColumn({ name: 'quoter_id' })
    quoter: Quoter;

    @ManyToOne(() => ImportState, { nullable: false })
    @JoinColumn({ name: 'import_state_id' })
    importState: ImportState;

    @OneToMany(() => ImportHistory, importHistory => importHistory.vehicle, { cascade: true })
    record: ImportHistory[];

    // @OneToMany(() => Notification, notification => notification.vehiculo)
    // notificacion_vechiculo: Notification[];
}
