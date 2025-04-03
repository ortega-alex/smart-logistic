import { Vehicle } from '@/interfaces';
import React, { createContext, useState } from 'react';

export type VehicleContextType = {
    vehicle: Vehicle;
    addVehicle: (vehicle: Vehicle) => void;
    updateVehicle: (vehicle: Vehicle) => void;
    resetVehicle: () => void;
};

export const EmptyVehicle: Vehicle = {
    id: 0,
    is_active: false,
    quoter: {
        id: 0,
        mark: '',
        model: '',
        year: '',
        lot: '',
        vin: '',
        is_aproverd: false,
        is_active: false
    },
    importState: {
        id: 0,
        name: '',
        index: 0,
        color: '',
        is_active: false
    }
};

export const VehicleContext = createContext<VehicleContextType | null>(null);
export const VehicleState: React.FC<{ children: React.ReactNode }> = props => {
    const [vehicle, setVehicle] = useState<Vehicle>(EmptyVehicle);

    const addVehicle = (vehicle: Vehicle) => setVehicle(vehicle);
    const updateVehicle = (_vehicle: Vehicle) => setVehicle({ ...vehicle, ..._vehicle });
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
