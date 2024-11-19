import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = createSlice({
    name: 'task',
    initialState: {
        items: []
    },
    reducers: {
        addTask: (state, action) => {
            state.items.push(action.payload);
        },
        removeTask: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        toggleComplete: (state, action) => {
            const element = state.items.find(item => item.id === action.payload);
            element.completed = !element.completed;
        }
    }
});

export const tasksActions = taskSlice.actions;
export default taskSlice.reducer;
