import { EmptyCustomer } from '@/constants';
import { Customer } from '@/interfaces';
import { _KEYS } from '@/models';
import { getStorage, removeStorage, saveStorage } from '@/services';
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
            removeStorage(_KEYS.SESSION_CUSTOMER);
            removeStorage(_KEYS.TOKEN);
            return emptySessionCustomer;
        }
    }
});

export const { setSessionCustomer, modifySessionCustomer, resetSesionCustomer } = sessionCustomerSlice.actions;
export default sessionCustomerSlice.reducer;
