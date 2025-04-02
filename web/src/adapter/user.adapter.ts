import { Sesion, User } from '@/interfaces';

export const sessionAdapter = (values: User): Sesion => ({
    ...values,
    session_id: values.id,
    iniciales: values.name.substring(0, 2).toUpperCase()
});
