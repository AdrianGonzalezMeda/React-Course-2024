const redux = require('redux');

// Reducer Function: Recives old State + Distpatched action and returns a new state object. Must be a pure function.
// The state parameter needs a default value due to Redux executes this function first and at this point state has
// no value yet. Reducer function its a general programing concept, not unique from redux or react
const counterReducer = (state = { counter: 0 }, action) => {
    if (action.type === 'increment') {
        return {
            counter: state.counter + 1
        }
    }

    if (action.type === 'decrement') {
        return {
            counter: state.counter - 1
        }
    }

    return state;
}

// Central data store: this store all the state data
const store = redux.createStore(counterReducer);

// Subscribers: You must subscribe to the state changes
const counterSubscriber = () => {
    const latestState = store.getState();
    console.log(latestState)
}

store.subscribe(counterSubscriber);

// Dispatched actions: This actions trigger the reducer function to change the state value
store.dispatch({type: 'increment'});
store.dispatch({type: 'decrement'});