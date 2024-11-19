import logo from "../assets/logo.jpg";
import { useContext } from "react";
import { CartContext } from "../store/CartContext.jsx";
import { UserProgressContext } from '../store/UserProgressContext.jsx';
import Button from "./UI/Button.jsx";

const Header = () => {
    const { items } = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = items.reduce((acc, item) => {
        return acc + item.quantity
    }, 0);

    return (
        <>
            <header id="main-header">
                <div id="title">
                    <img src={logo} alt="A restaurant" />
                    <h1>REACTFOOD</h1>
                </div>
                <nav>
                    <Button
                        textOnly
                        onClick={() => { userProgressCtx.showCart() }}
                    >Cart ({totalCartItems})</Button>
                </nav>
            </header>
        </>
    )
}

export default Header
