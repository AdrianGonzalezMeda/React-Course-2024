// useSelector: Custom React hook by react-redux to access an specific property of the store data
// useDispatch: Custom React hook by react-redux to dispatch actions
import { useSelector, useDispatch } from 'react-redux';
import classes from './Counter.module.css';
import { counterActions } from '../store/counter';

const Counter = () => {
    const dispatch = useDispatch();
    // This hook creates and handle behind the scenes a subscription to the store to listen this state changes
    const counter = useSelector(state => state.counter.counter);
    // When using multiple reducers its necessary to access at the key name that we use in the configureStore reducers property
    const show = useSelector(state => state.counter.showCounter);

    const toggleCounterHandler = () => {
        dispatch(counterActions.toggle()); // this functions creates an object like: {action: UNIQUE_IDENTIFIER}
        // dispatch({type: 'increment'}); old way, you may have problems with type errors or cross naming
    };

    const increaseHandler = () => {
        dispatch(counterActions.increase(5)); // {action: UNIQUE_IDENTIFIER, payload: 5}
    }

    const incrementHandler = () => {
        dispatch(counterActions.increment());
    }

    const decrementHandler = () => {
        dispatch(counterActions.decrement());
    }

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            {show && <div className={classes.value}>{counter}</div>}
            <div>
                <button onClick={incrementHandler}>Increment</button>
                <button onClick={increaseHandler}>Increase by 5</button>
                <button onClick={decrementHandler}>Decrement</button>
            </div>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;
