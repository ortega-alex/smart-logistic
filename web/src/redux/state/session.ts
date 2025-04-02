import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { _KEYS } from '@/models';
import { clearStorage, getStorage, saveStorage } from '@/services';
import { Sesion } from '@/interfaces';

const emptySession: Sesion = {
    session_id: 0,
    id: 0,
    email: '',
    is_active: false,
    name: '',
    username: '',
    phone_number: '',
    iniciales: 'NA'
};
const session = getStorage(_KEYS.SESSION);

export const sessionSlice = createSlice({
    name: 'session',
    initialState: session ? session : emptySession,
    reducers: {
        setSession: (_, action: PayloadAction<{ session: Sesion; token?: string }>) => {
            const { session, token } = action.payload;
            if (token) saveStorage(_KEYS.TOKEN, token);
            saveStorage(_KEYS.SESSION, session);
            return session;
        },
        modifySession: (state, action: PayloadAction<Partial<Sesion>>) => ({ ...state, ...action.payload }),
        resetSesion: () => {
            clearStorage();
            return emptySession;
        }
    }
});

export const { setSession, modifySession, resetSesion } = sessionSlice.actions;
export default sessionSlice.reducer;
