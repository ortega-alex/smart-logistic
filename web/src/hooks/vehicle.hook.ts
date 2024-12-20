import { VehicleContext } from '@/context';
import { useContext } from 'react';

export const useVehicle = () => {
    const context = useContext(VehicleContext);
    if (context === null) throw new Error('useVehicle must be used within a VehicleProvider');
    return context;
};
