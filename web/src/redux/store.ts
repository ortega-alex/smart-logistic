import { configureStore } from '@reduxjs/toolkit';
import { deviceSlice, menuSlice, sessionSlice } from './state';
import { sessionCustomerSlice } from './state/customer';

export const store = configureStore({
    reducer: {
        session: sessionSlice.reducer,
        device: deviceSlice.reducer,
        menu: menuSlice.reducer,
        session_customer: sessionCustomerSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
