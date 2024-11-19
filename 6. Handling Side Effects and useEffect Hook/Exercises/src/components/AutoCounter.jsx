import { useCallback, useEffect, useState } from "react"
/*
Descripción: Crea un componente que muestra un contador que se incrementa automáticamente cada segundo.
Objetivo: Usa useEffect para configurar el intervalo y useCallback para definir la función de incremento.
*/
const AutoCounterInput = () => {
    const [counter, setCounter] = useState(0);

    const increaseCounter = useCallback(() => setCounter(prev => prev + 1), []);

    useEffect(() => {
        const interval = setInterval(() => {
            increaseCounter();
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [increaseCounter]);

    return (
        <section id="auto-counter">
            <h1>Auto counter</h1>
            <p>{counter}</p>
        </section>
    )
}

export default AutoCounterInput
