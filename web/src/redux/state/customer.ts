import { _KEYS, EmptyCustomer } from '@/constants';
import { Customer } from '@/interfaces';
import { clearStorage, getStorage, saveStorage } from '@/services';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const emptySessionCustomer: Customer = EmptyCustomer;
const session_customer = getStorage(_KEYS.SESSION_CUSTOMER);

export const sessionCustomerSlice = createSlice({
    name: 'session',
    initialState: session_customer ? session_customer : emptySessionCustomer,
    reducers: {
        setSessionCustomer: (_, action: PayloadAction<{ session: Customer; token?: string }>) => {
            const { session, token } = action.payload;
            if (token) saveStorage(_KEYS.TOKEN, token);
            saveStorage(_KEYS.SESSION_CUSTOMER, session);
            return session;
        },
        modifySessionCustomer: (state, action: PayloadAction<Partial<Customer>>) => ({ ...state, ...action.payload }),
        resetSesionCustomer: () => {
            clearStorage();
            return emptySessionCustomer;
        }
    }
});

export const { setSessionCustomer, modifySessionCustomer, resetSesionCustomer } = sessionCustomerSlice.actions;
export default sessionCustomerSlice.reducer;
