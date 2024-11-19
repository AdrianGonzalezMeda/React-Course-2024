import { useEffect, useReducer } from "react";
/*
Descripción: Crea un temporizador con botones de inicio, pausa y reset. Usa useReducer para manejar el estado del temporizador.
Objetivo: Usa useReducer para definir los estados (iniciar, pausar y resetear) y useEffect para ejecutar el conteo.
Tips: useEffect debe iniciar el intervalo solo si el temporizador está en estado de "inicio".
*/
function counterReducer(state, action) {
    switch (action.type) {
        case 'START':
            return { ...state, isRunning: true }
        case 'STOP':
            return { ...state, isRunning: false }
        case 'RESET':
            return { time: 0, isRunning: false };
        case 'TICK':
            return { ...state, time: state.time + 1 };
        default:
            return state;
    }
}

const ReducerCounter = () => {
    const [counter, counterDispatch] = useReducer(counterReducer, {
        time: 0,
        isRunning: false
    });

    useEffect(() => {
        let interval;

        if (counter.isRunning) {
            interval = setInterval(() => {
                counterDispatch({ type: 'TICK' });
            }, 1000);
        }

        return () => {
            clearInterval(interval)
        }
    }, [counter.isRunning]);

    return (
        <section id="reducer-counter">
            <p style={{ textAlign: 'center' }}>Counter: {counter.time}</p>
            <button onClick={() => counterDispatch({ type: 'START' })}>Start</button>
            <button onClick={() => counterDispatch({ type: 'STOP' })}>Stop</button>
            <button onClick={() => counterDispatch({ type: 'RESET' })}>Reset</button>
        </section>
    )
}

export default ReducerCounter
