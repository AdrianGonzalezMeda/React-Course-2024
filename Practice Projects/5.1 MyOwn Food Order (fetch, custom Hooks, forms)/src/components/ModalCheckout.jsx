import { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CartContext } from '../store/shopping-cart-context';
import Input from "./Input.jsx"
import { submitOrder } from '../http.js';

const ModalCheckout = forwardRef(({ }, ref) => {
    const dialog = useRef();
    const { cartTotal } = useContext(CartContext);

    const handleCheckout = async (event) => {
        console.log(event.target)
        event.preventDefault();
        const fd = new FormData(event.target);
        const formData = Object.fromEntries(fd.entries());
        const response = await submitOrder(formData);
        console.log(response);
    }

    useImperativeHandle(ref, () => {
        return {
            open: () => dialog.current.showModal(),
            close: () => dialog.current.close()
        };
    });

    return createPortal(
        <dialog id="modal" className="modal" ref={dialog}>
            <h2>Checkout</h2>

            <p>Total Amount: ${cartTotal}</p>

            <form method="dialog" onSubmit={handleCheckout}>
                <Input label="Full Name" id="fullName" name="fullName" required />
                <Input label="Email" id="email" name="email" type="email" required />
                <Input label="Street" id="street" name="street" required />
                <div className="control-row">
                    <Input label="Postal Code" id="postalCode" name="postalCode" required />
                    <Input label="City" id="city" name="city" required />
                </div>

                <div className='modal-actions'>
                    <button type="button" onClick={() => { dialog.current.close() }} className="text-button">Close</button>
                    <button className='button'>Submit order</button>
                </div>
            </form>
        </dialog>,
        document.getElementById('checkout-modal')
    );
});

export default ModalCheckout;
