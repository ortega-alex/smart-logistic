import { configureStore } from '@reduxjs/toolkit';
import { deviceSlice, sessionSlice } from './state';

export const store = configureStore({
    reducer: {
        session: sessionSlice.reducer,
        device: deviceSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
