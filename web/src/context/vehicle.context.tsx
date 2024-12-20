import { EmptyVehicle, Vehicles } from '@/models';
import React, { createContext, useState } from 'react';

export type VehicleContextType = {
    vehicle: Vehicles;
    addVehicle: (vehicle: Vehicles) => void;
    updateVehicle: (vehicle: Vehicles) => void;
    resetVehicle: () => void;
};

export const VehicleContext = createContext<VehicleContextType | null>(null);
export const VehicleState: React.FC<{ children: React.ReactNode }> = props => {
    const [vehicle, setVehicle] = useState<Vehicles>(EmptyVehicle);

    const addVehicle = (vehicle: Vehicles) => setVehicle(vehicle);
    const updateVehicle = (_vehicle: Vehicles) => setVehicle({ ...vehicle, ..._vehicle });
    const resetVehicle = () => setVehicle(EmptyVehicle);

    return (
        <VehicleContext.Provider
            value={{
                vehicle,
                addVehicle,
                updateVehicle,
                resetVehicle
            }}
        >
            {props.children}
        </VehicleContext.Provider>
    );
};
