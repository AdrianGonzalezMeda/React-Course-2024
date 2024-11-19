import { useEffect } from 'react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

// Asi tratamos el modal de forma declarativa
const Modal = ({ children, open, onClose }) => {
    const dialog = useRef();

    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [open]); //Las dependencias son variables o estados que se usen dentro de la funcion y su valor pueda cambiar,
    // react determinara si el valor ha cambiado o no para volver a ejecutar la funcion
    
    // Necesitamos el onClose para arreglar un bug que existe cuando cerramos el modal con la tecla ESC, ya que esta 
    // accion no actualiza el estado de 'open' e imposibilita el volver a abrir el modal
    return createPortal(
        <dialog className="modal" ref={dialog} onClose={onClose}>
            {open ? children : null}
        </dialog>,
        document.getElementById('modal')
    );
}

export default Modal;

/*
Asi tratamos el modal de forma imperativa
const Modal = forwardRef(function Modal({ children }, ref) {
    const dialog = useRef();
  
    useImperativeHandle(ref, () => {
      return {
        open: () => {
          dialog.current.showModal();
        },
        close: () => {
          dialog.current.close();
        },
      };
    });
  
    return createPortal(
      <dialog className="modal" ref={dialog}>
        {children}
      </dialog>,
      document.getElementById('modal')
    );
  });
  
  export default Modal;
*/