import { Profile } from './entity/Profile';
import { Role } from './entity/Role';
import { Profile as ProfileInterface } from './interface/Profile';

export const getAll = async () => await Profile.find({ relations: { role: true } });

export const getById = async (id: number) => await Profile.findOne({ where: { id }, relations: { role: true } });

export const getRoles = async () => await Role.find();

export const getRoleById = async (id: number) => await Role.findOneBy({ id });

export const add = async (profile: ProfileInterface) => {
    const newProfile = new Profile();
    newProfile.name = profile.name;
    newProfile.is_active = profile.is_active ?? true;
    newProfile.role = profile.role;
    await newProfile.save();
    return newProfile;
};

export const update = async (id: number, profile: ProfileInterface) => await Profile.update({ id: Number(id) }, profile);

export default {
    getAll,
    getById,
    getRoles,
    getRoleById,
    add,
    update
};
