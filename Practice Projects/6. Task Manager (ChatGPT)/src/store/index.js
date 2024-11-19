import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './tasks';
import uiReducer from './ui';

export default configureStore({
    reducer: {task: taskReducer, ui: uiReducer}
});