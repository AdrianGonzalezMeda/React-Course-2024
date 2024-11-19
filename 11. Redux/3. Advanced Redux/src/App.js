import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true;

function App() {
    const dispatch = useDispatch();
    const showCart = useSelector(state => state.ui.showCart);
    const cart = useSelector(state => state.cart);
    const notification = useSelector(state => state.ui.notification);

    // Its cleaner to have the logic separated, this useEffect only executed one time
    useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch]);

    // Here we set a 'listener' to the cart changes and every time that cart is updated, the useEffect code 
    // is executed with the latest version of the cart state to update in the firebase BBDD
    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }

        // this is to avoid first launch because when the first fetching is done, the cart is updated and isInitial its false at this point, so to fix
        // this we can create a new cart property to set when the cart is changed or not, only set to true in addItem or removeItem actions
        if (cart.changed) {
            dispatch(sendCartData(cart))
        }
    }, [cart, dispatch]); // Its not necessary to create this function with useCallback hook because useDispatch its already a custom hook and react
    // ensure this function never change

    return (
        <>
            {notification && <Notification
                status={notification.status}
                title={notification.title}
                message={notification.message}
            />}
            <Layout>
                {showCart && <Cart />}
                <Products />
            </Layout>
        </>
    );
}

export default App;
