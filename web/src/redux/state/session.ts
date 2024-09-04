import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { _KEYS, Sesion } from '@/models';
import { clearStorage, getStorage, saveStorage } from '@/services';

const emptySession: Sesion = {
    id_sesion: 0,
    id_usuario: 0,
    correo: '',
    estado: false,
    nombre: '',
    usuario: '',
    telefono: ''
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
            clearStorage(_KEYS.SESSION);
            clearStorage(_KEYS.TOKEN);
            return emptySession;
        }
    }
});

export const { setSession, modifySession, resetSesion } = sessionSlice.actions;
export default sessionSlice.reducer;
