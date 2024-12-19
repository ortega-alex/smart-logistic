import { createSlice } from '@reduxjs/toolkit';

const isMovile: boolean = false;
export const deviceSlice = createSlice({
    name: 'device',
    initialState: isMovile,
    reducers: {
        modifyDevice: (_, action) => action.payload
    }
});

export const { modifyDevice } = deviceSlice.actions;
export default deviceSlice.reducer;
