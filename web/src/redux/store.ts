import { configureStore } from '@reduxjs/toolkit';
import { deviceSlice, menuSlice, sessionSlice } from './state';

export const store = configureStore({
    reducer: {
        session: sessionSlice.reducer,
        device: deviceSlice.reducer,
        menu: menuSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
