import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer, ImportState, User, Vehicles } from './';

@Entity('historial_importacion')
export class ImportHistory extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id_historial_importacion: string;

    @ManyToOne(() => Vehicles, vehicles => vehicles.historial_vechiculo, { nullable: false })
    @JoinColumn({ name: 'id_vehiculo' })
    vehiculo: Vehicles;

    @ManyToOne(() => ImportState, inport_state => inport_state.historial_estados, { nullable: false })
    @JoinColumn({ name: 'id_estado_importacion' })
    estado_importacion: ImportState;

    @ManyToOne(() => User, user => user.usuarios_importacion_historial)
    @JoinColumn({ name: 'id_usuario' })
    usuario: User;

    @ManyToOne(() => Customer, customer => customer.clientes_importacion_historial)
    @JoinColumn({ name: 'id_cliente' })
    cliente: Customer;

    @Column('varchar', { length: 300 })
    descripcion: string;

    @Column('varchar', { length: 300 })
    archivo: string;

    @Column({ default: false })
    visible_cliente: boolean;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    fecha_creacion: Date;
}
