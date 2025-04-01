import { Profile } from '../profile/entity/Profile';
import { User } from './entity/User';
import { OptionalUser, User as UserInterface } from './interface/User';

export const getAll = async () => await User.find({ relations: { profile: true } });

export const getByUsername = async (username: string) => await User.findOne({ where: { username }, relations: { profile: true } });

export const getById = async (id: number) => await User.findOne({ where: { id }, relations: { profile: true } });

export const getByEmail = async (email: string) => await User.findOneBy({ email });

export const save = async (user: UserInterface, profile: Profile) => {
    const newUser = new User();
    newUser.name = user.name;
    newUser.username = user.username;
    newUser.password = user.password;
    newUser.phone_number = user.phone_number;
    newUser.email = user.email;
    newUser.is_active = user.is_active ?? true;
    newUser.profile = profile;
    await newUser.save();
    return newUser;
};

export const update = async (id: number, user: OptionalUser, currentUser: User, profile: Profile | null) => {
    return await User.update(
        { id: Number(id) },
        {
            name: user.name ?? currentUser.name,
            username: user.username ?? currentUser.username,
            password: user.password ?? currentUser.password,
            phone_number: user.phone_number ?? currentUser.phone_number,
            email: user.email ?? currentUser.email,
            is_active: user.is_active ?? currentUser.is_active,
            profile: profile ?? currentUser.profile
        }
    );
};
