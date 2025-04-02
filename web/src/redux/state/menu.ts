import { Menu } from '@/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const emptyMenu: Array<Menu> = [];
export const menuSlice = createSlice({
    name: 'menu',
    initialState: emptyMenu,
    reducers: {
        setMenu: (_, action: PayloadAction<{ menus: Array<Menu> }>) => action.payload.menus,
        crearMenu: () => emptyMenu
    }
});

export const { setMenu, crearMenu } = menuSlice.actions;
export default menuSlice.reducer;
