import { useContext } from 'react';
import { CartContext } from '../store/CartContext.jsx';
import { UserProgressContext } from '../store/UserProgressContext.jsx';
import Input from "./UI/Input.jsx"
import Modal from './UI/Modal.jsx';
import Button from './UI/Button.jsx';
import ErrorMsg from './UI/ErrorMsg.jsx';
import useHttp from '../hooks/useHttp.js';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
}

const Checkout = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const { data, isLoading, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders', requestConfig);

    const cartTotal = cartCtx.items.reduce((acc, val) => {
        return acc + (val.price * val.quantity);
    }, 0);

    const handleCloseCheckout = () => {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    const handleCheckout = (event) => {
        event.preventDefault();

        const fd = new FormData(event.target);
        const formData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: formData
            }
        }));
    }

    let actions = (
        <>
            <Button textOnly type="button" onClick={handleCloseCheckout}>Close</Button>
            <Button>Submit order</Button>
        </>
    );

    if (isLoading) {
        actions = <span>Sending order data...</span>
    }

    if (data && !error) {
        return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
            <h2>Success!</h2>
            <p>Your order was submitted succesfully</p>
            <p>We will get back to you with more details via email within the next few minutes.</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
    }

    return (
        <Modal className="checkout" open={userProgressCtx.progress === 'checkout'} onClose={handleCloseCheckout}>
            <form onSubmit={handleCheckout}>
                <h2>Checkout</h2>
                <p>Total Amount: ${cartTotal}</p>

                <Input label="Full Name" id="name" type="text" />
                <Input label="Email" id="email" type="email" />
                <Input label="Street" id="street" type="text" />
                <div className="control-row">
                    <Input label="Postal Code" id="postal-code" type="text" />
                    <Input label="City" id="city" type="text" />
                </div>

                {error && <ErrorMsg title="Failed to submit order" error={error} />}

                <p className='modal-actions'>{actions}</p>
            </form>
        </Modal>
    )
}

export default Checkout
