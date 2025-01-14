import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ImportHistory, ImportState, Notification, Quoter } from './';

@Entity('vehiculos')
export class Vehicles extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_vehiculo: number;

    @ManyToOne(() => Quoter, quoter => quoter.cotizaciones, { nullable: false })
    @JoinColumn({ name: 'id_cotizacion' })
    cotizacion: Quoter;

    @ManyToOne(() => ImportState, inport_state => inport_state.estados_importacion, { nullable: false })
    @JoinColumn({ name: 'id_estado_importacion' })
    estado_importacion: ImportState;

    @Column({
        default: true
    })
    estado: boolean;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    fecha_creacion: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    fecha_edicion: Date;

    @OneToMany(() => ImportHistory, import_history => import_history.vehiculo)
    historial_vechiculo: Vehicles[];

    @OneToMany(() => Notification, notification => notification.vehiculo)
    notificacion_vechiculo: Notification[];
}
