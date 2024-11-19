import Modal from './UI/Modal'
import { useContext } from "react";
import { UserProgressContext } from '../store/UserProgressContext.jsx';
import { CartContext } from '../store/CartContext.jsx';
import { currencyFormatter } from "../util/formatting.js";
import Button from './UI/Button.jsx';
import CartItem from './CartItem.jsx';

const Cart = () => {
    const { items, updateItemQuantity } = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = items.reduce((acc, val) => {
        return acc + (val.price * val.quantity);
    }, 0);

    const handleCloseCart = () => {
        userProgressCtx.hideCart();
    }

    return (
        <Modal className="cart" open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}>
            <h2>Your Cart</h2>

            <ul>
                {items.map((item) => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onIncrease={() => updateItemQuantity(item.id, 1)}
                        onDecrease={() => updateItemQuantity(item.id, -1)}
                    />
                ))}
            </ul>

            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>

            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {items.length > 0 ? <Button onClick={userProgressCtx.showCheckout}>Go to Checkout</Button> : null}
            </p>
        </Modal>
    )
}

export default Cart
