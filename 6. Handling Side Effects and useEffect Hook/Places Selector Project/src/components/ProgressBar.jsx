import { useState, useEffect } from "react";



/* Antes esta logica estaba en DeleteConfirmation.jsx, pero se translada a otro componente por temas de optimizacion, ya que la actualizacion del estado
de remainingTime cada 10ms causaba la re ejecucion de todo el componente DeleteConfirmation con todo lo que conlleva, al haber otros hooks de useEffect
debe evaluar si los ejecuta o no y eso al final es carga que se puede reflejar en la aplicacion como lentitud. De esta forma aislamos la funcionalidad*/
const ProgressBar = ({ timer }) => {
    const [remainingTime, setRemainingTime] = useState(timer);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 10)
        }, 10);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <progress value={remainingTime} max={timer} />
    )
}

export default ProgressBar
