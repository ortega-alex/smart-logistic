import { _KEYS } from '@/constants';
import { Session } from '@/interfaces';
import { clearStorage, getStorage, saveStorage } from '@/services';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const EmptySession: Session = {
    session_id: 0,
    id: 0,
    email: '',
    is_active: false,
    name: '',
    username: '',
    phone_number: '',
    iniciales: '',
    level: 0,
    headquarter_id: 0
};
const session = getStorage(_KEYS.SESSION);

export const sessionSlice = createSlice({
    name: 'session',
    initialState: session ? session : EmptySession,
    reducers: {
        setSession: (_, action: PayloadAction<{ session: Session; token?: string }>) => {
            const { session, token } = action.payload;
            if (token) saveStorage(_KEYS.TOKEN, token);
            saveStorage(_KEYS.SESSION, session);
            return session;
        },
        modifySession: (state, action: PayloadAction<Partial<Session>>) => ({ ...state, ...action.payload }),
        resetSesion: () => {
            clearStorage();
            return EmptySession;
        }
    }
});

export const { setSession, modifySession, resetSesion } = sessionSlice.actions;
export default sessionSlice.reducer;
