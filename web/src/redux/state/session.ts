import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Sesion } from '@/models';

const emptySession: Sesion = {
    id_sesion: 0,
    id_usuario: 0,
    correo: '',
    estado: '',
    nombre_completo: '',
    usuario: ''
};

export const sessionSlice = createSlice({
    name: 'session',
    initialState: emptySession,
    reducers: {
        setSession: (_, action: PayloadAction<{ session: Sesion; token?: string }>) => {
            const { session } = action.payload;
            return session;
        },
        modifySession: (state, action: PayloadAction<Partial<Sesion>>) => ({ ...state, ...action.payload }),
        resetSesion: () => emptySession
    }
});

export const { setSession, modifySession, resetSesion } = sessionSlice.actions;
export default sessionSlice.reducer;
