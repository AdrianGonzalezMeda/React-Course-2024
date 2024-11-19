import { cartActions } from "./cart";
import { uiActions } from "./ui";

const urlFirebase = 'https://react-519ac-default-rtdb.europe-west1.firebasedatabase.app/cart.json';

// You can create your own actions, its called Action Creator Thunk. You can put the side-effect or async 
// functionality here or in the component, but never in the reducers, reducers will be pure always
// Actions expect to recive object like {type:..., payload:...}, but also accept functions. Its built-in in 
// redux and when you dispatch an action that returns a functions, redux execute it for you and also gives 
// you a dispatch parameter to dispatch another actions inside the function
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }));

        const sendRequest = async () => {
            const response = await fetch(
                urlFirebase,
                {
                    method: 'PUT',
                    body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity})
                });

            if (!response.ok) {
                throw new Error('Sending cart data failed');
            }
        }

        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Sent cart data successfully!'
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Sending cart data failed!'
            }));
        }
    };
}

export const fetchCartData = () => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }));

        const fetchData = async () => {
            const response = await fetch(urlFirebase);

            if (!response.ok) {
                throw new Error('Could not fetch cart data!')
            }

            const data = await response.json();

            return data;
        }

        try {
            const cartData = await fetchData();
            // We need to do this transformation due to how firebase returns the data
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Fetching cart data failed!'
            }));
        }
    }
}