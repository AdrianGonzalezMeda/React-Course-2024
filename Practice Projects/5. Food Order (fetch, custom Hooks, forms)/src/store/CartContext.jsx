import { createContext, useReducer } from "react";

export const CartContext = createContext({
    items: [],
    addItemToCart: (item) => { },
    updateItemQuantity: (id) => { },
    clearCart: () => { }
});

function shoppingCartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const item = { ...action.payload.item };
        const updatedItems = [...state.items];
        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === item.id
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
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: 1,
            });
        }

        return {
            ...state,
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
            ...state,
            items: updatedItems,
        };
    }

    if (action.type === 'CLEAR_CART') {
        return { ...state, items: [] }
    }

    return state;
}

const CartContextProvider = ({ children }) => {
    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {
        items: [],
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

    function handleClearCart() {
        shoppingCartDispatch({ type: 'CLEAR_CART' });
    }

    const ctxValue = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity,
        clearCart: handleClearCart
    }

    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;
