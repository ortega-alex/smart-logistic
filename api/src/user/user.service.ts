import { User } from './entity/User';
import { OptionalUser, User as UserInterface } from './interface/User';

export const getAll = async () => await User.find({ relations: { profile: true, headquarter: true } });

export const getByUsername = async (username: string) =>
    await User.getRepository()
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.headquarter', 'headquarter')
        .innerJoinAndSelect('user.profile', 'profile')
        .innerJoinAndSelect('profile.role', 'role')
        .where('user.username = :username', { username })
        .getOne();

export const getById = async (id: number) => await User.findOne({ where: { id }, relations: { profile: true } });

export const getByEmail = async (email: string) => await User.findOneBy({ email });

export const add = async (user: UserInterface) => {
    const newUser = new User();
    newUser.name = user.name;
    newUser.username = user.username;
    newUser.password = user.password;
    newUser.phone_number = user.phone_number;
    newUser.email = user.email;
    newUser.is_active = user.is_active ?? true;
    newUser.profile = user.profile;
    newUser.headquarter = user.headquarter;
    await newUser.save();
    return newUser;
};

export const update = async (id: number, user: OptionalUser) => await User.update({ id: Number(id) }, user);

export default {
    getAll,
    getByUsername,
    getById,
    getByEmail,
    add,
    update
};
