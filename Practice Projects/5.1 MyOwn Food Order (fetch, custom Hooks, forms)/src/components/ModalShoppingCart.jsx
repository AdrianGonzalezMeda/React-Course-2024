import { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CartContext } from '../store/shopping-cart-context';

const ModalShoppingCart = forwardRef(({ onGoCheckout }, ref) => {
    const dialog = useRef();
    const { items, cartTotal, updateItemQuantity } = useContext(CartContext);
    
    useImperativeHandle(ref, () => {
        return {
            open: () => dialog.current.showModal(),
            close: () => dialog.current.close()
        };
    });

    return createPortal(
        <dialog id="modal" className="modal" ref={dialog}>
            <h2>Your Cart</h2>

            <ul>
                {items.map((item) => (
                    <li key={item.id} className="cart-item">
                        <p>{item.name} - {item.quantity} x {item.price}</p>
                        <div className="cart-item-actions">
                            <button onClick={() => updateItemQuantity(item.id, -1)}>-</button>
                            {item.quantity}
                            <button onClick={() => updateItemQuantity(item.id, 1)}>+</button>
                        </div>
                    </li>
                ))}
            </ul>

            <span className="cart-total">$ {cartTotal}</span>

            <form method="dialog" className="modal-actions">
                <button className="text-button">Close</button>
                <button onClick={onGoCheckout} className='button'>Go to Checkout</button>
            </form>
        </dialog>,
        document.getElementById('cart-modal')
    );
});

export default ModalShoppingCart;
