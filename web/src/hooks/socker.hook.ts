import { socketContext } from '@/App';
import { useContext } from 'react';

export const useSocket = () => {
    const constext = useContext(socketContext);
    if (constext === null) throw new Error('useSocket must be used within a SocketProvider');
    return constext;
};
