import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { Profile, User } from '../entities';
import { generateToken } from '../middleware';

export const login = async (req: Request, res: Response) => {
    try {
        const { usuario, contrasenia } = req.body;
        if (!usuario) return res.status(203).json({ message: 'El usuario es requerido' });
        if (!contrasenia) return res.status(203).json({ message: 'El contraseña es requerida' });

        const session = await User.findOne({
            where: { usuario },
            relations: {
                perfil: true
            }
        });
        if (!session) return res.status(203).json({ message: 'User no encontrado' });
        if (session.estado === false) return res.status(203).json({ message: 'El usuario esta suspendido' });

        const match = bcrypt.compareSync(contrasenia, session.contrasenia);
        if (!match) return res.status(203).json({ message: 'Contraseña incorecta' });

        const token = generateToken({
            usuario: session.usuario,
            correo: session.correo
        });

        return res.json({ session, token });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const addUser = async (req: Request, res: Response) => {
    try {
        const { nombre, usuario, contrasenia, telefono, correo, id_perfil } = req.body;

        if (!nombre) return res.status(203).json({ message: 'El nombre es requerido' });
        if (!usuario) return res.status(203).json({ message: 'El usuario es requerido' });
        if (!telefono) return res.status(203).json({ message: 'El telefono es requerido' });
        if (!correo) return res.status(203).json({ message: 'El correo es requerido' });
        if (!id_perfil) return res.status(203).json({ message: 'El perfil es requerido' });

        const year = new Date().getFullYear();
        const pass = bcrypt.hashSync(contrasenia ?? `smart-${year}`, 8);

        const profile = await Profile.findOneBy({ id_perfil });
        if (!profile) return res.status(404).json({ message: 'Perfil no encontrado' });

        const user = new User();
        user.nombre = nombre;
        user.usuario = usuario;
        user.contrasenia = pass;
        user.telefono = telefono;
        user.correo = correo;
        user.perfil = profile;

        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find({
            relations: {
                perfil: true
            }
        });
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
