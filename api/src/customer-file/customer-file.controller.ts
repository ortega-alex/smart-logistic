import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { deleteById as deleteCustomerFileByIdService, getById as getCustomerFileByIdService } from './customer-file.service';

export const deleteById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const file = await getCustomerFileByIdService(Number(id));
        if (!file) return res.status(404).json({ message: 'File no exite' });

        const ruta = path.join(__dirname, `../public/${file.path}`);
        if (fs.existsSync(ruta)) fs.unlinkSync(ruta);

        const result = await deleteCustomerFileByIdService(Number(id));
        if (result.affected === 0) return res.status(404).json({ message: 'No se pudo eliminar el archivo' });
        return res.json({ message: 'Archivo eliminado' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
