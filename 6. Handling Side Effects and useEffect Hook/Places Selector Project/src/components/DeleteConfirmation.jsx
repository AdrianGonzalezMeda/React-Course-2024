import { useEffect } from "react";
import ProgressBar from "./ProgressBar";
const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            onConfirm();
        }, TIMER);

        // CleanUp function: la funcion se ejecutara antes de que useEffect se ejecute de nuevo o antes de que el componente
        // desaparezca del dom (nuestro caso, ya que estamos condicionando este conmponente en el Modal para cuando open === true)
        return () => {
            clearTimeout(timeout);
        }
    }, [onConfirm]); // Aqui deberiamos pasar la dependencia de onConfirm, ya que la estamos usando dentro de la funcion useEffect, 
    // Pero hay que tener cuidado al añadir como dependencias objetos de js, al final una funcion es un objeto, y en cada 
    // renderizado del componente padre se esta declarando la funcion, y aun que su valor no cambie, al ser un objeto ya 
    // no sera igual al objeto que guardariamos aqui como referencia. Esto podria causar bucles infinitos. Para solucionarlo
    // tenemos el hook useCallback que guarda las funciones en memoria y evita que estas vuelvan a crearse en las siguientes
    // ejecuciones del componente

    return (
        <div id="delete-confirmation">
            <h2>Are you sure?</h2>
            <p>Do you really want to remove this place?</p>
            <div id="confirmation-actions">
                <button onClick={onCancel} className="button-text">
                    No
                </button>
                <button onClick={onConfirm} className="button">
                    Yes
                </button>
            </div>
            <ProgressBar timer={TIMER} />
        </div>
    );
}
