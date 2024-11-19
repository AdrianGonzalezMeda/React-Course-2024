// NPM to manage redux
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counter';
import authSlice from './auth';

// This is like createStore, but you can configure multiple reducers in the reducer property and then, redux toolkit
// combine all the slice reducers into one single reducer. Because configureStore, like createStore, only accept 
// one reducer or a mapped object in the case we have multiple slices
const store = configureStore({
    reducer: { counter: counterSlice, auth: authSlice }
});
/* 
Example with only one reducer
const store = configureStore({
    reducer: counterSlice.reducer
});
*/

export default store;

/* This is the original way, using a reducer function, but it takes so much code and you may have typing errors or cross
naming with the action types  
import { createStore } from 'redux';

const counterReducer = (state = initialState, action) => {
    if (action.type === 'increment') {
        return {
            ...state,
            counter: state.counter + 1
        };
    }

    if (action.type === 'increase') {
        return {
            ...state,
            counter: state.counter + action.amount
        };
    }

    if (action.type === 'decrement') {
        return {
            ...state,
            counter: state.counter - 1
        };
    }

    if (action.type === 'toggle') {
        return {
            ...state,
            showCounter: !state.showCounter
        };
    }

    return state;
}
const store = createStore(counterReducer);
export default store;
*/

