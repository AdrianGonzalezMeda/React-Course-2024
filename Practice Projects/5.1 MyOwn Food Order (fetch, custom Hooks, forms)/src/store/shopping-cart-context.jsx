import { createContext, useReducer } from "react";
import { fetchProducts } from "../http";

export const CartContext = createContext({
    items: [],
    cartTotal: 0,
    addItemToCart: (item) => { },
    updateItemQuantity: (id) => { },
});

function shoppingCartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const product = { ...action.payload.item };
        const updatedItems = [...state.items];
        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === product.id
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };

            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
            });
        }

        return {
            cartTotal: updatedItems.reduce((acc, val) => {
                return acc + (val.price * val.quantity);
            }, 0),
            items: updatedItems,
        };
    }

    if (action.type === 'UPDATE_ITEM') {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            cartTotal: updatedItems.reduce((acc, val) => {
                return acc + (val.price * val.quantity);
            }, 0),
            items: updatedItems,
        };
    }

    return state;
}

const CartContextProvider = ({ children }) => {
    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {
        items: [],
        cartTotal: 0
    });

    function handleAddItemToCart(item) {
        shoppingCartDispatch({
            type: 'ADD_ITEM',
            payload: { item }
        });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type: 'UPDATE_ITEM',
            payload: { productId, amount }
        });
    }

    const ctxValue = {
        items: shoppingCartState.items,
        cartTotal: shoppingCartState.cartTotal,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity,
    }

    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider
