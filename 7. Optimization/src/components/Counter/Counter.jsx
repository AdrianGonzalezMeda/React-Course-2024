import { useState, memo, useCallback, useMemo } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';
import CounterHistory from './CounterHistory.jsx';

function isPrime(number) {
    log('Calculating if is prime number', 2, 'other');
  
    if (number <= 1) {
      return false;
    }
  
    const limit = Math.sqrt(number);
  
    for (let i = 2; i <= limit; i++) {
      if (number % i === 0) {
        return false;
      }
    }
  
    return true;
  }

const Counter = memo(function Counter({ initialCount }) {
    log('<Counter /> rendered', 1);
    // evitamos ejecuciones innecesarias de esta funcion, pasando un array de dependencias para saber en que momento debe ejecutarse la funcion
    const initialCountIsPrime = useMemo(
        () => isPrime(initialCount),
        [initialCount]
    );

    // const [counter, setCounter] = useState(initialCount);
    const [counterChanges, setCounterChanges] = useState([{value: initialCount, id: Math.random() + 1000}]); // Este cambio es para guardar el historico

    const currentCounter = counterChanges.reduce(
        (prevCounter, counterChange) => prevCounter + counterChange.value,
        0
    );

    // Junto con el uso de useCallback() y memo() en IconButton prevenimos ejecuciones innecesarias del componente. Es necesario el uso de use callback
    // ya que memo() comprueba que las props que recibe el componente tengan el mismo valor que en la anterior ejecucion, y como las funciones son
    // en esencia, objetos, éstas se vuelven a crear en la ejecucion del Counter y serian distintas, contaria como un cambio para memo() 
    const handleDecrement = useCallback(function handleDecrement() {
        // setCounter((prevCounter) => prevCounter - 1);
        setCounterChanges((prevCounterChanges) => [{value: -1, id: Math.random() + 1000}, ...prevCounterChanges]);
    }, []);

    const handleIncrement = useCallback(function handleIncrement() {
        // setCounter((prevCounter) => prevCounter + 1);
        setCounterChanges((prevCounterChanges) => [{value: 1, id: Math.random() + 1000}, ...prevCounterChanges]);
    }, []);

    return (
        <section className="counter">
            <p className="counter-info">
                The initial counter value was <strong>{initialCount}</strong>. It{' '}
                <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
            </p>
            <p>
                <IconButton icon={MinusIcon} onClick={handleDecrement}>
                    Decrement
                </IconButton>
                <CounterOutput value={currentCounter} />
                <IconButton icon={PlusIcon} onClick={handleIncrement}>
                    Increment
                </IconButton>
            </p>
            <CounterHistory history={counterChanges} />
        </section>
    );
});

export default Counter;
