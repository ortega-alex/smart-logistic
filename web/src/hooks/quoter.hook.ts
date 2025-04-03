import { QuoterContext } from '@/context';
import { useContext } from 'react';

export const useQuoter = () => {
    const context = useContext(QuoterContext);
    if (context === null) throw new Error('useVehicle must be used within a QuoterProvider');
    return context;
};
