import { useCallback, useEffect, useState } from "react"
/*
Descripción: Crea un contador automático que se incrementa cada cierto tiempo. Incluye un input donde el usuario pueda ajustar el intervalo de tiempo en milisegundos.
Objetivo: Usa useEffect para manejar el intervalo y que este cambie dinámicamente según el valor del input.
Tips: Asegúrate de limpiar el intervalo antiguo cada vez que el valor del input cambie.
*/
const AutoCounter = () => {
    const [counter, setCounter] = useState(0);
    const [timer, setTimer] = useState(0);

    const increaseCounter = useCallback(() => setCounter(prev => prev + 1), []);

    useEffect(() => {
        if (timer < 1) {
            return;
        }

        const interval = setInterval(() => {
            increaseCounter();
        }, timer * 1000);

        return () => {
            clearInterval(interval);
        }
    }, [increaseCounter, timer]);

    return (
        <section id="auto-counter">
            <h1>Auto counter</h1>
            <p>
                <label>Set timer in seconds:</label>
                <input type="numeric" value={timer} onChange={(event) => setTimer(event.target.value)}/>
            </p>
            <p>{counter}</p>
        </section>
    )
}

export default AutoCounter
