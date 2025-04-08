import { Session, User } from '@/interfaces';

export const sessionAdapter = (values: User): Session => ({
    ...values,
    session_id: values.id,
    iniciales: values.name.substring(0, 2).toUpperCase(),
    level: values.profile?.role?.level ?? 3,
    headquarter_id: values.headquarter?.id ?? 0,
    eeuu_state: values.headquarter?.state ? true : false
});
