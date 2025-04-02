import { Profile, User } from '@/interfaces';

export const EmptyProfile: Profile = {
    id: 0,
    name: '',
    is_active: true
};

export const UserEmpty: User = {
    id: 0,
    name: '',
    username: '',
    password: '',
    phone_number: '',
    email: '',
    is_active: true,
    profile: EmptyProfile
};
