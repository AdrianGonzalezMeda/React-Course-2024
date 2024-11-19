import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(({ targetTime, remainingTime, onReset }, ref) => {
    const dialog = useRef();
    const lostGame = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    /* Es un hook que nos permite exportar funcionalidad (como un api del componente), en este caso, si llamasemos al dialog.current.showModal()
    desde otro componente, alquien podria cambiar el jsx del componente y al quitar la etiqueta dialog se pierde
    la funcionalidad de showModal(), ya que es algo interno de la etiqueta dialog. De esta forma, detallando la 
    funcionalidad aqui, es mas facil saber que tus cambios del jsx afectan a la funcionalidad*/
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        };
    });

    // Nos da la capacidad de colocar el jsx del componente en otra parte del DOM que le especifiquemos en el segundo parametro
    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {lostGame && <h2>You lost</h2>}
            {!lostGame && <h2>Your score: {score}</h2>}
            <p>Target time was <strong>{targetTime}</strong> seconds.</p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>, 
        document.getElementById('modal')
    )
});

export default ResultModal
