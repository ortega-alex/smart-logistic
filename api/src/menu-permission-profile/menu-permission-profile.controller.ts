import { Request, Response } from 'express';
import { getByProfileId as getPermissionMenuByProfileIdService } from './menu-permission-profile.service';

export const getByProfileId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const permissions = await getPermissionMenuByProfileIdService(Number(id));
        return res.json(permissions);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export default {
    getByProfileId
};
