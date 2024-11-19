import logo from "../assets/logo.jpg";
import { useContext, useRef } from "react";
import { CartContext } from "../store/shopping-cart-context.jsx";
import ModalShoppingCart from "./ModalShoppingCart.jsx"
import ModalCheckout from "./ModalCheckout.jsx"

const Header = () => {
    const { items } = useContext(CartContext);
    const modalShoppingCart = useRef();
    const modalCheckout = useRef();
    
    const handleOpenCartModal = () => {
        modalShoppingCart.current.open();
    }

    const handleGoCheckout = (event) => {
        event.preventDefault();
        modalShoppingCart.current.close();
        
        if (items.length > 0) {
            modalCheckout.current.open();
        }
    }

    return (
        <>
            <header id="main-header">
                <div id="title">
                    <img src={logo} />
                    <h1>REACTFOOD</h1>
                </div>
                <button onClick={handleOpenCartModal}>Cart ({items.length})</button>
            </header>
            <ModalShoppingCart onGoCheckout={handleGoCheckout} ref={modalShoppingCart} />
            <ModalCheckout ref={modalCheckout} />
        </>
    )
}

export default Header
