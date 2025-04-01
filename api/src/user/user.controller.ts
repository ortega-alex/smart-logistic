import { getById as getProfileByIdService } from '../profile/profile.service';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { sendEmail } from '../email';
import { defaultPassword, Email } from '../interfaces';
import { generateToken } from '../middleware';
import {
    getAll as getAllUserService,
    getByEmail as getUserByEmailService,
    getById as getUserByIdService,
    getByUsername as getUserByUsernameService,
    save as saveUserService,
    update as updateUserService
} from './user.service';

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username) return res.status(203).json({ message: 'El usuario es requerido' });
        if (!password) return res.status(203).json({ message: 'El contraseña es requerida' });

        const user = await getUserByUsernameService(username);
        if (!user) return res.status(203).json({ message: 'Usuario no encontrado' });
        if (user.is_active === false) return res.status(203).json({ message: 'El usuario esta suspendido' });

        const match = bcrypt.compareSync(password, user.password);
        if (!match) return res.status(203).json({ message: 'Contraseña incorecta' });

        const token = generateToken({
            user: user.username,
            email: user.email
        });

        return res.json({ session: user, token });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const add = async (req: Request, res: Response) => {
    try {
        const { name, username, password, phone_number, email, profile_id } = req.body;

        if (!name) return res.status(203).json({ message: 'El nombre es requerido' });
        if (!username) return res.status(203).json({ message: 'El usuario es requerido' });
        if (!phone_number) return res.status(203).json({ message: 'El telefono es requerido' });
        if (!email) return res.status(203).json({ message: 'El correo es requerido' });
        if (!profile_id) return res.status(203).json({ message: 'El perfil es requerido' });

        const encryptedPassword = bcrypt.hashSync(password ?? defaultPassword, 8);

        const profile = await getProfileByIdService(Number(profile_id));
        if (!profile) return res.status(404).json({ message: 'Perfil no encontrado' });

        const existing_user = await getUserByUsernameService(username);
        if (existing_user) return res.status(203).json({ message: 'El usuario ya existe' });

        const user = await saveUserService({ name, username, password: encryptedPassword, phone_number, email }, profile);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getAll = async (_req: Request, res: Response) => {
    try {
        const users = await getAllUserService();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, profile_id, email, phone_number, is_active, token_fcm } = req.body;
        const user = await getUserByIdService(Number(id));
        if (!user) return res.status(404).json({ message: 'Usuario no exite' });

        let profile = null;
        if (profile_id) profile = await getProfileByIdService(Number(profile_id));

        const update = await updateUserService(Number(id), { name, profile_id, email, phone_number, is_active, token_fcm }, user, profile);

        if ((update?.affected ?? 0) > 0) return res.json(user);

        return res.status(203).json({ message: 'No se pudo actualizar el usuario' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(203).json({ message: 'El correo es requerido' });

        const user = await getUserByEmailService(email);
        if (!user) return res.status(203).json({ message: 'El usuario no existe' });

        const ramdomCode = Math.floor(100000 + Math.random() * 900000);
        const newEmail: Email = {
            to: user.email,
            subject: 'Recuperación de contraseña',
            html: `<h1>Hola ${user.name}</h1>
            <p>Para restablecer tu contraseña, utiliza el siguiente codigo: <strong>${ramdomCode}</strong>, el cual tiene un tiempo de validez de temporal.</p>
            <p>Si no has solicitado la recuperación de tu contraseña, ignora este correo.</p>
            <p>Saludos,</p>
            <p>El equipo de Smart Logistic</p>`
        };

        await sendEmail(newEmail);
        res.status(200).json({
            message: 'Se ha enviado un correo con el codigo para restablecer la contraseña',
            user_id: user.id,
            code: ramdomCode
        });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        if (!id) return res.status(203).json({ message: 'El usuario es requerido' });

        const user = await getUserByIdService(Number(id));
        if (!user) return res.status(203).json({ message: 'El usuario no existe' });

        const pass = bcrypt.hashSync(password ?? defaultPassword, 8);
        const update = await updateUserService(Number(id), { password: pass }, user, null);
        if ((update?.affected ?? 0) > 0) return res.json({ message: 'Contraseña restablecida!', success: true });

        return res.status(203).json({ message: 'No se pudo actualizar el usuario' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
