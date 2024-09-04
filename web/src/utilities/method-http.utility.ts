import { _SERVER, RequesParam } from '@/models';
import axios from 'axios';

export const httpRequest = async (payload: RequesParam) => {
    try {
        const res = await axios({
            method: payload.method,
            url: _SERVER.apiUrl + payload.path,
            data: payload.data,
            timeout: 20000
        });
        return res.data;
    } catch (error) {
        return Promise.reject(error);
    }
};
