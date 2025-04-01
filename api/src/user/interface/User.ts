export interface User {
    id?: number;
    name: string;
    username: string;
    password: string;
    phone_number: string;
    email: string;
    is_active?: boolean;
    profile_id?: number;
    token_fcm?: string;
}

export type OptionalUser = Partial<User>;
