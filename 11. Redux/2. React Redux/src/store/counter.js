import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

// Slice the global store into separated pieces of state. In this reducers its "allowed to mutate" the object, behind the
// scenes redux toolkit copy the state object and override in a inmmutable way
const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        increment(state) { // by doing this way its impossible to cross name the reducer's actions or type it wrong
            state.counter++;
        },
        increase(state, action) {
            state.counter = state.counter + action.payload; // payload its the defalut name property for extra data recived in the dispatch actions
        },
        decrement(state) {
            state.counter--;
        },
        toggle(state) {
            state.showCounter = !state.showCounter;
        }
    }
});

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;