import { Sesion, User } from '@/models';

export const sessionAdapter = (values: User): Sesion => ({
    ...values,
    id_sesion: values.id_usuario,
    iniciales: values.nombre.substring(0, 2).toUpperCase()
});
