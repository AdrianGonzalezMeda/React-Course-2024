import { useEffect, useState } from "react"

/*
Descripción: Crea un botón que se deshabilita por 5 segundos después de ser presionado.
Objetivo: Usa useEffect para manejar la cuenta regresiva de 5 segundos cada vez que el botón es presionado.
Tips: Piensa en cómo limpiar el temporizador si el componente se desmonta antes de que pasen los 5 segundos.
*/
const DisableButton = () => {
    const [clicked, setClicked] = useState(false);
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        console.log('useEffect', clicked)
        if (!clicked) {
            return;
        }

        const timer = setTimeout(() => {
            console.log('setTimeout')
            setDisable(true);
        }, 5000);

        return () => {
            clearTimeout(timer);
        }
    }, [clicked]);

    return (
        <section id="disable-button">
            <button
                onClick={() => setClicked((prev) => !prev)}
                disabled={disable}
            >Click me!</button>
        </section>
    )
}

export default DisableButton
