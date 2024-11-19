import { connect } from 'react-redux';
import classes from './Counter.module.css';
import { Component } from 'react';

class Counter extends Component {
    toggleCounterHandler() {

    };

    incrementHandler() {
        this.props.increment();
    }

    decrementHandler() {
        this.props.decrement();
    }

    render() {
        return (
            <main className={classes.counter}>
                <h1>Redux Counter Class Based</h1>
                <div className={classes.value}>{this.props.counter}</div>
                <div>
                    <button onClick={this.incrementHandler.bind(this)}>Increment</button>
                    <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
                </div>
                <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
            </main>
        )
    }
}

// Similar to the custom hook useSelector
const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
}

// Similar to the custom hook useDispatch
const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => dispatch({type: 'increment'}),
        decrement: () => dispatch({type: 'decrement'})
    }
}

// You need to connect the state and dispatch functions to the Counter Class
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
