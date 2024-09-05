import { _SERVER, RequesParam } from '@/models';
import axios from 'axios';

export const httpRequest = async (payload: RequesParam) => {
    try {
        let data: any;
        if (payload?.type === 'multipart') {
            data = new FormData();
            Object.keys(payload?.data).forEach(key => {
                if (key === 'files' && Array.isArray(payload?.data[key]?.fileList))
                    payload?.data[key].fileList.forEach((file: any) => data.append('files', file.originFileObj));
                else data.append(key, payload?.data[key]);
            });
        } else data = payload?.data;

        const res = await axios({
            method: payload.method,
            url: _SERVER.apiUrl + payload.path,
            data,
            timeout: 20000
        });
        return res.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

// export const httpRequestMultiparts = (payload: RequesParam) => {
//     const data = new FormData();
//     Object.keys(payload?.data).forEach(key => {
//         if (key === 'files' && Array.isArray(payload?.data[key]?.fileList))
//             payload?.data[key].fileList.forEach((file: File) => data.append('files', file));
//         else data.append(key, payload?.data[key]);
//     });
//     return fetch(_SERVER.apiUrl + payload.path, {
//         method: payload.method,
//         body: data,
//         headers: {
//             Authorization:
//                 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoibS5vcnRlZ2EiLCJjb3JyZW8iOiJtLm9ydGVnYUBtYWlsLmNvbSIsImlhdCI6MTcyNTMzMzA1OX0.GhS0WqHSx3tMSXMEJXM5BJqN06Fec2lSshxaMtKPLaE'
//         }
//     });
// };
