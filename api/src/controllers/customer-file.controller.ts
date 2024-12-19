import { Request, Response } from 'express';
import { CustomerFile } from '../entities';
import path from 'path';
import fs from 'fs';

export const deleteCustomerFile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const file = await CustomerFile.findOneBy({ id_archivo: Number(id) });
        if (!file) return res.status(404).json({ message: 'File no exite' });

        const ruta = path.join(__dirname, `../public/${file.ruta}`);
        if (fs.existsSync(ruta)) fs.unlinkSync(ruta);

        const result = await CustomerFile.delete({ id_archivo: Number(id) });
        if (result.affected === 0) return res.status(404).json({ message: 'No se pudo eliminar el archivo' });
        return res.json({ message: 'Archivo eliminado' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
