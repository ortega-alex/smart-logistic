import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { sendEmail } from '../email';
import { Profile, User } from '../entities';
import { generateToken } from '../middleware';
import { defaultPassword, Email } from '../model';

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

        const pass = bcrypt.hashSync(contrasenia ?? defaultPassword, 8);

        const profile = await Profile.findOneBy({ id_perfil });
        if (!profile) return res.status(404).json({ message: 'Perfil no encontrado' });

        const existing_user = await User.findOneBy({ usuario });
        if (existing_user) return res.status(203).json({ message: 'El usuario ya existe' });

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

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre, id_perfil, correo, telefono, estado } = req.body;
        const user = await User.findOneBy({ id_usuario: Number(id) });
        if (!user) return res.status(404).json({ message: 'Usuario no exite' });

        const profile = await Profile.findOneBy({ id_perfil });
        if (!profile) return res.status(404).json({ message: 'Perfil no encontrado' });

        const update = await User.update(
            { id_usuario: Number(id) },
            {
                nombre: nombre ?? user.nombre,
                correo: correo ?? user.correo,
                telefono: telefono ?? user.telefono,
                estado: estado ?? user.estado,
                perfil: profile
            }
        );

        if ((update?.affected ?? 0) > 0) return res.json(user);

        return res.status(203).json({ message: 'No se pudo actualizar el usuario' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { correo } = req.body;
        if (!correo) return res.status(203).json({ message: 'El correo es requerido' });

        const user = await User.findOneBy({ correo });
        if (!user) return res.status(203).json({ message: 'El usuario no existe' });

        const ramdomCode = Math.floor(100000 + Math.random() * 900000);
        const email: Email = {
            to: user.correo,
            subject: 'Recuperación de contraseña',
            html: `<h1>Hola ${user.nombre}</h1>
            <p>Para restablecer tu contraseña, utiliza el siguiente codigo: <strong>${ramdomCode}</strong>, el cual tiene un tiempo de validez de temporal.</p>
            <p>Si no has solicitado la recuperación de tu contraseña, ignora este correo.</p>
            <p>Saludos,</p>
            <p>El equipo de Smart Logistic</p>`
        };

        sendEmail(email)
            .then(() =>
                res.status(200).json({
                    message: 'Se ha enviado un correo con el codigo para restablecer la contraseña',
                    user_id: user.id_usuario,
                    code: ramdomCode
                })
            )
            .catch(error => res.status(500).json({ message: (error as Error).message }));
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        if (!id) return res.status(203).json({ message: 'El usuario es requerido' });

        const user = await User.findOneBy({ id_usuario: Number(id) });
        if (!user) return res.status(203).json({ message: 'El usuario no existe' });

        const pass = bcrypt.hashSync(password ?? defaultPassword, 8);
        const update = await User.update({ id_usuario: user.id_usuario }, { contrasenia: pass });
        if ((update?.affected ?? 0) > 0) return res.json({ message: 'Contraseña restablecida!', success: true });

        return res.status(203).json({ message: 'No se pudo actualizar el usuario' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
