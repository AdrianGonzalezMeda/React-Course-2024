import CartContextProvider from "./store/shopping-cart-context.jsx";
import Header from "./components/Header.jsx";
import ProductsList from "./components/ProductsList.jsx";

function App() {
    return (
        <CartContextProvider>
            <Header />
            <ProductsList />
        </CartContextProvider>
    );
}

export default App;
