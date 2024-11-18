import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ImportState, User } from './';

@Entity('historial_importacion')
export class ImportHistory extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id_historial_importacion: string;

    @ManyToMany(() => ImportState, inport_state => inport_state.historial_estados, { nullable: false })
    @JoinColumn({ name: 'id_estado_importacion' })
    historial_estado: ImportState;

    @ManyToMany(() => User, user => user.usuarios_importacion_historial, { nullable: false })
    @JoinColumn({ name: 'id_usuario' })
    usuario: User;

    @Column('varchar', { length: 300 })
    descripcion: string;

    @Column('varchar', { length: 300 })
    archivo: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    fecha_creacion: Date;
}
