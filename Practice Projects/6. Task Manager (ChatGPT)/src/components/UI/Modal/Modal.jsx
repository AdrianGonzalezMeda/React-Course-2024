import { useEffect } from 'react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import classes from './Modal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../store/ui';

const Modal = ({ identifier, onClose, children }) => {
    const dialog = useRef();
    const dispatch = useDispatch();
    const modals = useSelector(state => state.ui.modals);
    const modal = modals.find(modal => modal.id === identifier);

    useEffect(() => {
        console.log('useeffect')
        dispatch(uiActions.addModalHandler(identifier));
    }, [identifier, dispatch]);

        if (modal) {
            if (modal.open && !dialog.current.open) {
                dialog.current.showModal();
            } else if (!modal.open && dialog.current.open) {
                dialog.current.close();
            }
        }

    return createPortal(
        <dialog ref={dialog} className={classes.modal} onClose={onClose}>
            <div className={classes['modal-content']}>
                {children}
            </div>
        </dialog>,
        document.getElementById('modal')
    );
}

export default Modal
