import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        modals: []
    },
    reducers: {
        addModalHandler: (state, action) => {
            const modal = state.modals.find(modal => modal.id === action.payload);
            if (!modal) {
                state.modals.push({ id: action.payload, open: false });
                console.log('Modal added:', state.modals);
            }
        },
        toggleModal: (state, action) => {
            const modal = state.modals.find(modal => modal.id === action.payload);
            if (modal) {
                modal.open = !modal.open;
                console.log('Modal toggled:', [modal.id, modal.open]);
            } else {
                console.log(`Modal with id ${action.payload} not found`);
            }
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;