import { Profile } from './entity/Profile';
import { Profile as ProfileInterface } from './interface/Profile';

export const getAll = async () => await Profile.find();

export const getById = async (id: number) => await Profile.findOneBy({ id });

export const save = async (profile: ProfileInterface) => {
    const newProfile = new Profile();
    newProfile.name = profile.name;
    newProfile.is_active = profile.is_active ?? true;
    await newProfile.save();
    return newProfile;
};

export const update = async (id: number, profile: ProfileInterface, currentProfile: Profile) => {
    return await Profile.update(
        { id: Number(id) },
        {
            name: profile.name ?? currentProfile.name,
            is_active: profile.is_active ?? currentProfile.is_active
        }
    );
};
