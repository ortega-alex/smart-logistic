import { configureStore } from '@reduxjs/toolkit';
import { sessionSlice } from './state';

export const store = configureStore({
    reducer: {
        session: sessionSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
